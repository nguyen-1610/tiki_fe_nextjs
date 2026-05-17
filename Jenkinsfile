// Jenkinsfile = script chạy trên Jenkins, định nghĩa pipeline CD
// Khi GitHub webhook trigger Jenkins → Jenkins chạy file này

pipeline {
    // agent any: chạy trên bất kỳ Jenkins agent nào có sẵn
    agent any

    stages {
        stage('Deploy') {
            steps {
                // withCredentials: lấy SSH key từ Jenkins Credentials (không lộ key trong code)
                // Trước đó phải vào Jenkins → Credentials → tạo credential với id 'ssh-key'
                // credentialsId: tên credential đã tạo trong Jenkins
                // keyFileVariable: Jenkins tạo file tạm chứa private key → gán vào biến SSH_KEY
                // usernameVariable: username SSH → gán vào biến SSH_USER
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ssh-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )
                ]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no \
                            -i ${SSH_KEY} \
                            ${SSH_USER}@139.180.135.228 '
                                cd /root/app &&
                                docker pull znic/tiki-fe:latest &&
                                docker-compose up -d --remove-orphans
                            '
                    """
                    // -o StrictHostKeyChecking=no: không hỏi "bạn có tin tưởng host này không?"
                    // -i ${SSH_KEY}: dùng private key để xác thực thay vì password
                    // cd /root/app: vào thư mục chứa docker-compose.yml trên VPS
                    // docker pull: lấy image mới nhất từ DockerHub (GitHub Actions vừa push lên)
                    // docker-compose up -d --remove-orphans: chạy lại containers, xóa container cũ không dùng nữa
                }
            }
        }
    }

    post {
        // post chạy sau khi tất cả stages xong
        success {
            // env.BUILD_NUMBER: biến Jenkins tự cung cấp, là số thứ tự của build
            echo "✅ Build #${env.BUILD_NUMBER} đã deploy thành công!"
        }
        failure {
            echo "❌ Build #${env.BUILD_NUMBER} đã thất bại!"
        }
    }
}