# Terraform = Infrastructure as Code
# File này định nghĩa VPS cần tạo trên Vultr
# Chạy: terraform init → terraform plan → terraform apply

# Khai báo provider cần dùng
# Provider = plugin giúp Terraform giao tiếp với cloud provider (Vultr, AWS, GCP...)
terraform {
  required_providers {
    vultr = {
      source  = "vultr/vultr"
      version = "2.31.2"
    }
  }
}

# Xác thực với Vultr bằng API key
# api_key lấy từ variable bên dưới — không gõ thẳng vào đây vì file này push lên GitHub
provider "vultr" {
  api_key = var.vultr_api_key
}

# Khai báo variable — giá trị thật được điền trong terraform.tfvars (không push lên git)
variable "vultr_api_key" {
  description = "Vultr API key — lấy từ Vultr Dashboard → Account → API"
}

# Tạo VPS instance trên Vultr
resource "vultr_instance" "tiki_server" {
  hostname = "tiki-server"   # tên hiển thị trên Vultr dashboard
  region   = "sgp"           # Singapore — gần Việt Nam, latency thấp
  plan     = "vc2-1c-1gb"   # 1 CPU, 1GB RAM — đủ cho dự án học tập (~$6/tháng)
  os_id    = 2284            # Ubuntu 22.04 LTS — distro phổ biến nhất cho server
}

# In ra IP của VPS sau khi tạo xong
# Dùng IP này để điền vào ansible/inventory.ini và Jenkinsfile
output "tiki_server_ip" {
  value = vultr_instance.tiki_server.main_ip
}
