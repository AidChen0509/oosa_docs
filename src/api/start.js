// src/api/start.js
const server = require('./server');

// 這個文件用於獨立執行API服務器
console.log('正在啟動Changelog API服務器...');

// 使用 async/await 啟動 Fastify 5.x 服務器
const start = async () => {
  try {
    await server.listen({ 
      port: process.env.API_PORT || 3100, 
      host: '0.0.0.0' 
    });
    
    console.log(`服務器已啟動於 ${server.server.address().port} 端口`);
  } catch (err) {
    console.error('啟動服務器時發生錯誤:', err);
    process.exit(1);
  }
};

// 啟動服務器
start();