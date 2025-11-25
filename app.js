const express = require('express');
const app = express();

// 환경변수에서 포트 가져오기 (기본값: 3000)
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My Web App';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(express.static('public'));

// 메인 페이지
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${APP_NAME}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .container {
          background: white;
          border-radius: 20px;
          padding: 60px 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          text-align: center;
        }
        h1 {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        p {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .info-box {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          margin-top: 30px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #667eea;
        }
        .value {
          color: #333;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          margin-top: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 ${APP_NAME}</h1>
        <p>Docker와 GitHub Actions로 배포된 웹 애플리케이션입니다.</p>
        
        <div class="info-box">
          <div class="info-item">
            <span class="label">환경</span>
            <span class="value">${ENVIRONMENT}</span>
          </div>
          <div class="info-item">
            <span class="label">포트</span>
            <span class="value">${PORT}</span>
          </div>
          <div class="info-item">
            <span class="label">상태</span>
            <span class="value">✅ 정상 작동</span>
          </div>
        </div>

        <a href="/api/status" class="button">API 상태 확인</a>
      </div>
    </body>
    </html>
  `);
});

// API 엔드포인트
app.get('/api/status', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT,
    appName: APP_NAME,
    uptime: process.uptime()
  });
});

// Health check 엔드포인트 (로드밸런서용)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${ENVIRONMENT}`);
  console.log(`🏷️  App Name: ${APP_NAME}`);
});

