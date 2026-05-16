# Mỗi FROM à 1 image sạch hoàn toàn, không có gì từ stage trước cả 
# trừ những gì bạn chủ động COPY --from=... sang.

# Stage 1: install dependencies --> deps là tên để gọi lại ở stage sau
FROM node:22-alpine AS deps 
WORKDIR /app
# image node:alpine mặc định không có pnpm, phải cài thêm:
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
# Muốn cài đúng version như lock file, không cho pnpm tự update,
# vì lock file (--frozen-lockfile) đã ghi chặt version rồi
# --ignore-scripts nói với pnpm: "cài packages nhưng đừng chạy bất kỳ build script nào, và đừng báo lỗi về việc đó".
RUN pnpm install --frozen-lockfile --ignore-scripts

# Stage 2: build lý do phải tách ra với stage 1:
# S1 chỉ install dependency, không có code
# S2 mới build code
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
# chỉ copy node_modules từ stage deps sang
COPY --from=deps /app/node_modules ./node_modules
# sau khi copy node_modules rồi, mới copy source code lên:
# lúc này .dockerignore sẽ lọc bỏ những thứ không cần
COPY . .
RUN pnpm build

# Stage 3: runner (image thật sự chạy)
# Mục tiêu: nhỏ nhất có thể, chỉ chứa đúng những gì cần để chạy.
FROM node:22-alpine AS runner
WORKDIR /app
# Báo cho Next.js biết đang chạy production — tắt debug, tối ưu performance
ENV NODE_ENV=production

# Đây là thư mục standalone Next.js tạo ra sau build — chứa server.js + mọi thứ cần thiết, không cần node_modules nữa
COPY --from=builder /app/.next/standalone ./
# Static assets (JS, CSS đã chunk) — standalone không tự include cái này
COPY --from=builder /app/.next/static ./.next/static
# File public (ảnh, favicon...) — cũng phải copy thủ công
COPY --from=builder /app/public ./public

EXPOSE 3000
# Chạy server Next.js
CMD ["node", "server.js"]

# Tại sao image cuối nhỏ hơn nhiều?

# Stage deps:    node_modules (~500MB)
# Stage builder: node_modules + source + .next (~700MB)
# Stage runner:  chỉ .next/standalone (~50MB)

# Docker chỉ ship stage cuối — 2 stage trước bị bỏ hoàn toàn.

