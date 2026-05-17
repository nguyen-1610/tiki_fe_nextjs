---
name: devops-cicd-vn
description: >
  Hướng dẫn toàn bộ quy trình DevOps CI/CD bằng tiếng Việt, bao gồm:
  Docker, Docker Compose, GitHub Actions, Jenkins, Ansible, Terraform,
  Grafana/Prometheus. Dùng skill này khi: bắt đầu dự án DevOps mới,
  setup pipeline CI/CD từ đầu, debug Jenkins webhook không trigger,
  deploy ứng dụng lên VPS, cài đặt monitoring, tạo hạ tầng tự động,
  hoặc bất kỳ câu hỏi nào liên quan đến Docker/Jenkins/Ansible/Terraform.
---

# DevOps CI/CD Pipeline - Hướng Dẫn Toàn Diện (Tiếng Việt)

Tổng hợp từ thực tế xây dựng pipeline hoàn chỉnh cho dự án MERN Stack
(React + Express + MongoDB) deploy lên VPS Vultr Singapore.

---

## Kiến trúc tổng quan

```
Developer (máy local)
   │ git push
   ▼
GitHub Repo
   ├── GitHub Actions → build Docker image → push DockerHub
   └── Webhook → Jenkins
                   │ SSH vào VPS
                   ▼
              VPS (Vultr/Oracle)
                   ├── docker pull image mới
                   ├── docker-compose up -d
                   └── Containers đang chạy:
                       ├── frontend (React/Nginx)
                       ├── backend (Express)
                       ├── mongodb
                       ├── prometheus
                       ├── grafana
                       ├── node-exporter
                       ├── mongodb-exporter
                       └── jenkins
```

---

## LUỒNG 1: Bắt đầu dự án mới từ đầu

### Bước 1 — Chuẩn bị source code
```
project/
├── backend/
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   └── package.json
├── ansible/
│   ├── inventory.ini
│   ├── playbook.yml
│   └── ansible.cfg
├── terraform/
│   ├── main.tf
│   └── terraform.tfvars  ← KHÔNG push lên GitHub!
├── docker-compose.yml
├── prometheus.yml
├── Jenkinsfile
└── .gitignore
```

### Bước 2 — Viết Dockerfile

**Backend (Node.js):**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 8001
CMD ["node", "server.js"]
```

**Frontend (React → Nginx):**
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf (cần thiết cho React Router):**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### Bước 3 — Viết docker-compose.yml

```yaml
services:
  mongodb:
    image: mongo:6
    container_name: todo-mongodb
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - todo-network

  backend:
    image: DOCKERHUB_USERNAME/todo-backend:latest  # dùng image khi deploy VPS
    container_name: todo-backend
    restart: always
    ports:
      - "8001:8001"
    environment:
      - MONGO_URI=mongodb://todo-mongodb:27017/todo-app
      - PORT=8001
    depends_on:
      - mongodb
    networks:
      - todo-network

  frontend:
    image: DOCKERHUB_USERNAME/todo-frontend:latest
    container_name: todo-frontend
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - todo-network

  prometheus:
    image: prom/prometheus
    container_name: todo-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - todo-network

  node-exporter:
    image: prom/node-exporter
    container_name: todo-node-exporter
    ports:
      - "9100:9100"
    networks:
      - todo-network

  mongodb-exporter:
    image: percona/mongodb_exporter:0.40
    container_name: todo-mongodb-exporter
    ports:
      - "9216:9216"
    environment:
      - MONGODB_URI=mongodb://todo-mongodb:27017/todo-app
    networks:
      - todo-network

  grafana:
    image: grafana/grafana:latest
    container_name: todo-grafana
    restart: always
    ports:
      - "3001:3000"
    networks:
      - todo-network
    depends_on:
      - prometheus

  jenkins:
    image: jenkins/jenkins:lts
    container_name: todo-jenkins
    restart: always
    user: root
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_data:/var/jenkins_home
    networks:
      - todo-network

volumes:
  mongodb_data:
  jenkins_data:

networks:
  todo-network:
    driver: bridge
```

### Bước 4 — Viết prometheus.yml

```yaml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 1m
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'mongodb'
    static_configs:
      - targets: ['mongodb-exporter:9216']
```

### Bước 5 — Viết GitHub Actions

Tạo file `.github/workflows/deploy.yml`:
```yaml
name: deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Login DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build & Push Backend
        uses: docker/build-push-action@v4
        with:
          context: ./backend
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/todo-backend:latest

      - name: Build & Push Frontend
        uses: docker/build-push-action@v4
        with:
          context: ./frontend
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/todo-frontend:latest
```

**Secrets cần tạo trên GitHub:**
```
DOCKERHUB_USERNAME = tên tài khoản DockerHub
DOCKERHUB_TOKEN    = access token DockerHub (Read & Write)
```

### Bước 6 — Viết Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(
                    credentialsId: 'ssh-key',
                    keyFileVariable: 'SSH_KEY',
                    usernameVariable: 'SSH_USER'
                )]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no \
                            -i \${SSH_KEY} \
                            \${SSH_USER}@VPS_IP_ADDRESS '
                                cd /root/app &&
                                docker pull DOCKERHUB_USERNAME/todo-backend:latest &&
                                docker pull DOCKERHUB_USERNAME/todo-frontend:latest &&
                                docker-compose up -d --remove-orphans
                            '
                    """
                }
            }
        }
    }

    post {
        success { echo '✅ Deploy thành công!' }
        failure { echo '❌ Deploy thất bại!' }
    }
}
```

### Bước 7 — Viết Terraform (tạo VPS tự động)

```hcl
# terraform/main.tf
terraform {
  required_providers {
    vultr = {
      source  = "vultr/vultr"
      version = "2.19.0"
    }
  }
}

provider "vultr" {
  api_key = var.vultr_api_key
}

variable "vultr_api_key" {
  description = "Vultr API Key"
}

resource "vultr_instance" "todo_server" {
  plan   = "vc2-2c-2gb"   # 2 CPU, 2GB RAM, $15/tháng
  region = "sgp"           # Singapore
  os_id  = 2284            # Ubuntu 22.04
  label  = "todo-app-server"
}

output "server_ip" {
  value = vultr_instance.todo_server.main_ip
}
```

```hcl
# terraform/terraform.tfvars  ← KHÔNG push lên GitHub!
vultr_api_key = "API_KEY_CỦA_BẠN"
```

**.gitignore phải có:**
```
terraform/terraform.tfvars
terraform/.terraform/
terraform/*.tfstate
terraform/*.tfstate.backup
ansible/.bash_history
ansible/.ssh/
ansible/.docker/
ansible/app/
```

### Bước 8 — Viết Ansible Playbook

**ansible/inventory.ini:**
```ini
[servers]
my-server ansible_host=VPS_IP ansible_user=root ansible_password=VPS_PASSWORD ansible_ssh_common_args='-o StrictHostKeyChecking=no'
```

**ansible/ansible.cfg:**
```ini
[defaults]
host_key_checking = False

[ssh_connection]
ssh_args = -o ControlMaster=no -o ControlPersist=no -o StrictHostKeyChecking=no
```

**ansible/playbook.yml:**
```yaml
- name: Triển khai Todo App
  hosts: servers
  become: true

  tasks:
    - name: Cập nhật apt
      apt:
        update_cache: yes

    - name: Cài đặt Git
      apt:
        name: git
        state: present

    - name: Cài đặt curl
      apt:
        name: curl
        state: present

    - name: Cài đặt Docker
      apt:
        name: docker.io
        state: present

    - name: Cài đặt Docker Compose
      shell: |
        curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose

    - name: Clone source từ GitHub
      git:
        repo: "https://github.com/USERNAME/REPO.git"
        dest: /root/app
        version: main

    - name: Chạy docker-compose
      shell: docker-compose up -d
      args:
        chdir: /root/app
```

---

## LUỒNG 2: Khi sửa code và deploy

```
1. Sửa code trên máy local
2. git add . && git commit -m "message" && git push
3. GitHub Actions tự động chạy:
   → Build Docker image mới
   → Push lên DockerHub
4. GitHub Webhook trigger Jenkins
5. Jenkins tự động SSH vào VPS:
   → docker pull image mới
   → docker-compose up -d --remove-orphans
6. App cập nhật trên VPS (không downtime!)
```

**Không cần làm thêm gì cả sau bước 2!**

---

## LUỒNG 3: Khi cần tạo VPS mới (dùng Terraform + Ansible)

```bash
# Bước 1: Tạo VPS bằng Terraform
cd terraform/
terraform init      # lần đầu tiên
terraform plan      # xem trước sẽ tạo gì
terraform apply     # tạo VPS thật

# Bước 2: Lấy IP mới từ output
# Sửa ansible/inventory.ini với IP mới và password mới

# Bước 3: Deploy app bằng Ansible
# Vào container ubuntu-ansible
docker exec -it ubuntu-ansible bash
ANSIBLE_CONFIG=/root/ansible.cfg ansible-playbook -i /root/inventory.ini /root/playbook.yml

# Bước 4: Xóa VPS cũ nếu không cần
terraform destroy
```

---

## LUỒNG 4: Khi VPS bị hỏng, cần rebuild từ đầu

```bash
# Bước 1: Xóa VPS cũ
terraform destroy

# Bước 2: Tạo VPS mới
terraform apply
# → nhận IP mới

# Bước 3: Cập nhật inventory.ini với IP mới
# Bước 4: Chạy Ansible
ANSIBLE_CONFIG=/root/ansible.cfg ansible-playbook -i /root/inventory.ini /root/playbook.yml

# Bước 5: Cập nhật Jenkinsfile với IP mới
# Bước 6: Setup lại Jenkins (xem phần Setup Jenkins)
```

---

## LUỒNG 5: Setup Jenkins từ đầu trên VPS mới

### 1. Lấy password khởi động
```bash
docker exec todo-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### 2. Vào http://VPS_IP:8080 → nhập password → Install suggested plugins

### 3. Tạo Credentials
Manage Jenkins → Credentials → Global → Add Credentials:
```
Kind: SSH Username with private key
ID: ssh-key
Username: root
Private Key: nội dung file ~/.ssh/id_rsa (private key, KHÔNG phải .pub)
```

### 4. Tạo Pipeline Job
New Item → Đặt tên → Pipeline → OK

**General:**
- Tick "GitHub project" → điền URL repo

**Triggers:**
- Tick "GitHub hook trigger for GITScm polling"

**Pipeline:**
- Definition: Pipeline script from SCM (QUAN TRỌNG!)
- SCM: Git
- Repository URL: https://github.com/USERNAME/REPO
- Branch: */main
- Script Path: Jenkinsfile (chữ J HOA!)

### 5. Thêm Webhook trên GitHub
Settings → Webhooks → Add webhook:
```
Payload URL: http://VPS_IP:8080/github-webhook/
Content type: application/json
Event: Just the push event
```

---

## LUỒNG 6: Setup Grafana Dashboard

### Kết nối Prometheus
1. Vào http://VPS_IP:3001 (admin/admin)
2. Connections → Data sources → Add → Prometheus
3. URL: http://prometheus:9090 (dùng tên service!)
4. Save & Test

### Import Dashboard có sẵn
Dashboards → New → Import:
- ID `1860` → Node Exporter Full (monitor CPU/RAM/Disk)
- ID `12079` → MongoDB Overview

---

## Debug Checklist

### Jenkins webhook không trigger

```
1. Vào GitHub → Settings → Webhooks → Recent Deliveries
   → Response 200? → OK, Jenkins nhận được
   → Response lỗi? → Kiểm tra firewall VPS

2. Vào http://VPS_IP:8080/job/JOB_NAME/githubHookLog
   → Thấy "No changes"?
   → Nguyên nhân: đang dùng "Pipeline script" thay vì "Pipeline script from SCM"
   → Fix: chuyển sang Pipeline script from SCM + tạo file Jenkinsfile trong repo

3. Jenkinsfile chưa có trong repo?
   → Tạo file Jenkinsfile (J HOA) ở root của repo
   → git push lên

4. Vẫn không trigger?
   → Xóa workspace Jenkins:
     docker exec -it todo-jenkins bash
     rm -rf /var/jenkins_home/workspace/JOB_NAME
   → Push 1 commit mới
```

### Ansible không SSH được vào VPS

```bash
# Thêm vào ansible.cfg
[ssh_connection]
ssh_args = -o ControlMaster=no -o ControlPersist=no -o StrictHostKeyChecking=no

# Chạy với explicit config
ANSIBLE_CONFIG=/root/ansible.cfg ansible-playbook -i /root/inventory.ini /root/playbook.yml

# Nếu dùng password, cài sshpass
apt install sshpass -y
```

### Docker không chạy được trong container

```
Triệu chứng: "Cannot connect to Docker daemon"
Nguyên nhân: Container không có Docker daemon
Fix: Mount Docker socket khi chạy container
docker run ... -v /var/run/docker.sock:/var/run/docker.sock ...
```

### SSH Key không hoạt động

```bash
# Test SSH với verbose
ssh -v root@VPS_IP

# Kiểm tra authorized_keys trên VPS
cat /root/.ssh/authorized_keys
# Phải thấy nội dung PUBLIC key (bắt đầu bằng ssh-rsa)
# KHÔNG phải private key (bắt đầu bằng -----BEGIN OPENSSH PRIVATE KEY-----)

# Kiểm tra permissions
ls -la /root/.ssh/
# .ssh phải là 700
# authorized_keys phải là 600

# Bật PubkeyAuthentication nếu bị comment
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
systemctl restart sshd
```

---

## Thông tin quan trọng cần nhớ

### Các port mặc định
```
Frontend:          3000
Backend:           8001
MongoDB:           27017
Prometheus:        9090
Grafana:           3001 (dùng 3001 vì 3000 đã dùng cho frontend)
Node Exporter:     9100
MongoDB Exporter:  9216
Jenkins:           8080
```

### Ansible chạy ở đâu trên Windows
Windows không chạy Ansible trực tiếp → dùng container Ubuntu:
```bash
# Tạo container (chỉ cần làm 1 lần)
docker run -d -it --name ubuntu-ansible \
  -v ./ansible:/root \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ubuntu:24.04

# Vào container và cài Ansible
docker exec -it ubuntu-ansible bash
apt update && apt install ansible sshpass -y

# Mỗi lần dùng
docker start ubuntu-ansible
docker exec -it ubuntu-ansible bash
ANSIBLE_CONFIG=/root/ansible.cfg ansible-playbook -i /root/inventory.ini /root/playbook.yml
```

### Terraform chạy ở đâu
Cũng cài trong container ubuntu-ansible:
```bash
cd /root/terraform
terraform init
terraform plan
terraform apply
```

### Phân biệt công dụng các tool
```
Docker Compose  → Chạy nhiều container cùng lúc
GitHub Actions  → CI: Build & Push image lên DockerHub
Jenkins         → CD: Deploy image mới lên VPS tự động
Ansible         → Setup VPS mới (cài Docker, clone repo, chạy app)
Terraform       → Tạo VPS tự động bằng code (Infrastructure as Code)
Prometheus      → Thu thập metrics (CPU, RAM, MongoDB...)
Grafana         → Hiển thị metrics thành dashboard đẹp
```

### Khi nào dùng Ansible vs Jenkins
```
Ansible: Setup lần đầu, tạo VPS mới, cài đặt phần mềm
Jenkins: Deploy code mới mỗi khi push (tự động, liên tục)
```

---

## Next.js 14 — Docker & CI/CD

### Bật standalone mode (bắt buộc)
```js
// next.config.mjs
const nextConfig = {
  output: 'standalone',
}
```
Không có dòng này thì `.next/standalone` không được tạo → Docker build thành công nhưng không chạy được.

### Dockerfile cho Next.js (multi-stage: deps → builder → runner)
```dockerfile
# Stage 1: Cài dependencies
FROM node:22-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
# --frozen-lockfile: không cho phép thay đổi pnpm-lock.yaml (giữ đúng version)
# --ignore-scripts: bỏ qua build scripts của packages (tránh bị block bởi @fortawesome và tương tự)

# Stage 2: Build app
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build
# Mỗi FROM là image hoàn toàn mới → pnpm không được kế thừa → phải cài lại

# Stage 3: Runner (image production nhỏ gọn)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

**Tại sao dùng Node.js thay vì Nginx?**
Next.js có SSR (Server-Side Rendering) và dynamic routes → cần Node.js runtime. Nginx chỉ serve static file, không xử lý được SSR.

### GitHub Actions cho Next.js
Phải có `setup-buildx-action` trước `build-push-action@v5`, nếu không báo lỗi buildx:
```yaml
- name: Set up Docker Buildx
  uses: docker/setup-buildx-action@v3   # ← bắt buộc

- name: Build & Push
  uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: USERNAME/IMAGE:latest
```

---

## SSH Key trên Windows

`ssh-copy-id` không có trên PowerShell → dùng lệnh này thay:
```powershell
type C:\Users\ADMIN\.ssh\id_rsa.pub | ssh root@VPS_IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```
Nhập password VPS 1 lần → sau đó SSH không cần password nữa.

---

## Grafana — Data Source URL

Khi Grafana và Prometheus cùng chạy trong Docker network → dùng **tên container** thay vì IP:
```
http://tiki-prometheus:9090   ✓ đúng
http://139.180.135.228:9090   ✗ không cần thiết (vẫn chạy được nhưng không phải best practice)
```

---

## Ansible — Module thường dùng

```yaml
# Cài nhiều package cùng lúc
- name: Install packages
  apt:
    name:
      - git
      - curl
      - docker.io
    state: present

# Download file từ internet (thay vì dùng shell + curl)
- name: Install docker-compose
  get_url:
    url: https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64
    dest: /usr/local/bin/docker-compose
    mode: '0755'   # chmod 755 — cấp quyền execute

# Chạy lệnh shell trong thư mục cụ thể
- name: Run docker-compose
  shell:
    cmd: docker-compose up -d
    chdir: /root/app   # tương đương cd /root/app trước khi chạy
```

---

## Terraform — Phân biệt hostname vs label

```hcl
resource "vultr_instance" "server" {
  hostname = "tiki-server"   # tên bên trong OS (chạy `hostname` trên VPS sẽ thấy)
  label    = "tiki-server"   # tên hiển thị trên Vultr dashboard
}
```
Không set `label` → Vultr tự đặt tên là "Cloud Instance" trên dashboard (không ảnh hưởng hoạt động).