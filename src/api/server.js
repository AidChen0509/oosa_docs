// src/api/server.js
const Fastify = require('fastify');
const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
const util = require('util');

// 將 exec 轉換為 Promise 風格
const execPromise = util.promisify(exec);

// 載入.env檔案中的環境變數
dotenv.config();

const PORT = process.env.API_PORT || 3100;
const API_SECRET_KEY = process.env.API_SECRET_KEY;

// 創建 Fastify 實例
const fastify = Fastify({
  logger: true,
  // 啟用請求 ID 生成
  requestIdHeader: 'x-request-id',
  // 配置格式化器以進行日誌美化
  requestIdLogLabel: 'requestId'
});

// 註冊 CORS 插件
fastify.register(import('@fastify/cors'));

// 驗證請求的鉤子函數
fastify.addHook('onRequest', async (request, reply) => {
  const authToken = request.headers['x-api-key'];
  
  // 健康檢查端點不需要驗證
  if (request.routeOptions.url === '/api/health') {
    return;
  }
  
  // Notion webhook 端點不需要驗證
  if (request.routeOptions.url === '/api/webhook/notion') {
    return;
  }
  
  if (!authToken || authToken !== API_SECRET_KEY) {
    throw new Error('未授權的請求');
  }
});

// 錯誤處理
fastify.setErrorHandler(async (error, request, reply) => {
  fastify.log.error(error);
  
  // 處理特定錯誤
  if (error.message === '未授權的請求') {
    return reply.code(401).send({ error: error.message });
  }
  
  // 默認錯誤處理
  return reply.code(500).send({ 
    error: '內部服務器錯誤',
    message: error.message
  });
});

// 健康檢查端點
fastify.route({
  method: 'GET',
  url: '/api/health',
  handler: async () => {
    return { status: 'ok' };
  }
});

// 生成公開版changelog的端點
fastify.route({
  method: 'POST',
  url: '/api/generate-changelog/public',
  handler: async () => {
    const rootDir = path.resolve(__dirname, '../../');
    const command = 'npm run generate-changelog:public';
    
    try {
      const { stdout, stderr } = await execPromise(command, { cwd: rootDir });
      
      if (stderr) {
        fastify.log.warn(`警告: ${stderr}`);
      }
      
      fastify.log.info(`輸出: ${stdout}`);
      return { 
        success: true, 
        message: '公開版changelog生成成功',
        output: stdout 
      };
    } catch (error) {
      fastify.log.error(`執行錯誤: ${error.message}`);
      return { 
        success: false, 
        error: error.message, 
        details: error.stderr 
      };
    }
  }
});

// 生成內部版changelog的端點
fastify.route({
  method: 'POST',
  url: '/api/generate-changelog/internal',
  handler: async () => {
    const rootDir = path.resolve(__dirname, '../../');
    const command = 'npm run generate-changelog:internal';
    
    try {
      const { stdout, stderr } = await execPromise(command, { cwd: rootDir });
      
      if (stderr) {
        fastify.log.warn(`警告: ${stderr}`);
      }
      
      fastify.log.info(`輸出: ${stdout}`);
      return { 
        success: true, 
        message: '內部版changelog生成成功',
        output: stdout 
      };
    } catch (error) {
      fastify.log.error(`執行錯誤: ${error.message}`);
      return { 
        success: false, 
        error: error.message, 
        details: error.stderr 
      };
    }
  }
});

// 同時生成兩種changelog的端點
fastify.route({
  method: 'POST',
  url: '/api/generate-changelog/all',
  handler: async () => {
    const rootDir = path.resolve(__dirname, '../../');
    
    try {
      // 執行內部版本生成
      const { stdout: internalStdout, stderr: internalStderr } = 
        await execPromise('npm run generate-changelog:internal', { cwd: rootDir });
      
      if (internalStderr) {
        fastify.log.warn(`內部版警告: ${internalStderr}`);
      }
      
      // 執行公開版本生成
      const { stdout: publicStdout, stderr: publicStderr } = 
        await execPromise('npm run generate-changelog:public', { cwd: rootDir });
      
      if (publicStderr) {
        fastify.log.warn(`公開版警告: ${publicStderr}`);
      }
      
      fastify.log.info(`內部版輸出: ${internalStdout}`);
      fastify.log.info(`公開版輸出: ${publicStdout}`);
      
      return { 
        success: true, 
        message: '所有changelog生成成功',
        internalOutput: internalStdout,
        publicOutput: publicStdout
      };
    } catch (error) {
      // 區分內部和公開版錯誤
      if (error.stdout && error.stdout.includes('generate-changelog:internal')) {
        fastify.log.error(`內部版生成錯誤: ${error.message}`);
        return { 
          success: false, 
          error: error.message, 
          details: error.stderr,
          step: 'internal' 
        };
      } else {
        fastify.log.error(`公開版生成錯誤: ${error.message}`);
        return { 
          success: false, 
          error: error.message, 
          details: error.stderr,
          step: 'public'
        };
      }
    }
  }
});

// Notion webhook端點 (可由Notion自動觸發)
fastify.route({
  method: 'POST',
  url: '/api/webhook/notion',
  handler: async (request) => {
    const payload = request.body;
    fastify.log.info('收到Notion webhook:', payload);
    
    // 可以基於webhook內容決定是否要生成changelog
    const rootDir = path.resolve(__dirname, '../../');
    
    try {
      await execPromise('npm run generate-changelog:all', { cwd: rootDir });
      return { received: true, processed: true };
    } catch (error) {
      fastify.log.error(`執行錯誤: ${error.message}`);
      // 不要返回錯誤給Notion，以避免webhook重試
      return { received: true, processed: false };
    }
  }
});

// 啟動服務器的函數
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    // Fastify 5.x 自動處理 SIGINT 和 SIGTERM 信號
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// 只有在直接運行此文件時才啟動服務器
if (require.main === module) {
  start();
}

// 導出 Fastify 實例供測試使用
module.exports = fastify;