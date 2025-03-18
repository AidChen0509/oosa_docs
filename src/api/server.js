const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// 載入.env檔案中的環境變數
dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3100;
const API_SECRET_KEY = process.env.API_SECRET_KEY;

// Middleware
app.use(bodyParser.json());

// 驗證請求的中間件
const verifyRequest = (req, res, next) => {
  const authToken = req.headers['x-api-key'];
  
  if (!authToken || authToken !== API_SECRET_KEY) {
    return res.status(401).json({ error: '未授權的請求' });
  }
  
  next();
};

// 健康檢查端點
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 生成公開版changelog的端點
app.post('/api/generate-changelog/public', verifyRequest, (req, res) => {
  const rootDir = path.resolve(__dirname, '../../');
  const command = 'npm run generate-changelog:public';
  
  exec(command, { cwd: rootDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`執行錯誤: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        error: error.message, 
        details: stderr 
      });
    }
    
    if (stderr) {
      console.warn(`警告: ${stderr}`);
    }
    
    console.log(`輸出: ${stdout}`);
    res.status(200).json({ 
      success: true, 
      message: '公開版changelog生成成功',
      output: stdout 
    });
  });
});

// 生成內部版changelog的端點
app.post('/api/generate-changelog/internal', verifyRequest, (req, res) => {
  const rootDir = path.resolve(__dirname, '../../');
  const command = 'npm run generate-changelog:internal';
  
  exec(command, { cwd: rootDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`執行錯誤: ${error.message}`);
      return res.status(500).json({ 
        success: false, 
        error: error.message, 
        details: stderr 
      });
    }
    
    if (stderr) {
      console.warn(`警告: ${stderr}`);
    }
    
    console.log(`輸出: ${stdout}`);
    res.status(200).json({ 
      success: true, 
      message: '內部版changelog生成成功',
      output: stdout 
    });
  });
});

// 同時生成兩種changelog的端點
app.post('/api/generate-changelog/all', verifyRequest, (req, res) => {
  const rootDir = path.resolve(__dirname, '../../');
  
  // 先執行內部版本生成
  exec('npm run generate-changelog:internal', { cwd: rootDir }, (internalError, internalStdout, internalStderr) => {
    if (internalError) {
      console.error(`內部版生成錯誤: ${internalError.message}`);
      return res.status(500).json({ 
        success: false, 
        error: internalError.message, 
        details: internalStderr,
        step: 'internal' 
      });
    }
    
    // 再執行公開版本生成
    exec('npm run generate-changelog:public', { cwd: rootDir }, (publicError, publicStdout, publicStderr) => {
      if (publicError) {
        console.error(`公開版生成錯誤: ${publicError.message}`);
        return res.status(500).json({ 
          success: false, 
          error: publicError.message, 
          details: publicStderr,
          step: 'public',
          internalOutput: internalStdout
        });
      }
      
      console.log(`內部版輸出: ${internalStdout}`);
      console.log(`公開版輸出: ${publicStdout}`);
      
      res.status(200).json({ 
        success: true, 
        message: '所有changelog生成成功',
        internalOutput: internalStdout,
        publicOutput: publicStdout
      });
    });
  });
});

// Notion webhook端點 (可由Notion自動觸發)
app.post('/api/webhook/notion', (req, res) => {
  // 這裡可以添加從Notion接收webhook的邏輯
  // 例如驗證webhook簽名等
  
  const payload = req.body;
  console.log('收到Notion webhook:', JSON.stringify(payload));
  
  // 可以基於webhook內容決定是否要生成changelog
  const rootDir = path.resolve(__dirname, '../../');
  
  exec('npm run generate-changelog:all', { cwd: rootDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`執行錯誤: ${error.message}`);
      // 不要返回錯誤給Notion，以避免webhook重試
      return res.status(200).json({ received: true });
    }
    
    console.log(`輸出: ${stdout}`);
    res.status(200).json({ received: true });
  });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`Changelog API服務器已啟動，監聽端口 ${PORT}`);
});

module.exports = app; // 用於測試等目的