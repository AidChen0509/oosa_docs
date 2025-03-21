# 使用 Node.js 18 作為基礎鏡像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm ci

# 複製所有源代碼
COPY . .

# 建立目錄以確保 changelog 生成時不會出錯
RUN mkdir -p internal_changelog public_changelog

# 設置環境變數
ENV NODE_ENV=production
ENV NOTION_API_KEY=
ENV NOTION_DATABASE_ID=
ENV API_PORT=3100
ENV API_SECRET_KEY=changelog

# 構建 Docusaurus 靜態網站
RUN npm run build

# 暴露 Docusaurus 和 API 端口
EXPOSE 3000
EXPOSE 3100

# 啟動命令
CMD ["sh", "-c", "npm run api:start & npm run serve -- --port 3000 --host 0.0.0.0"]