const gpt = require('./gpt');

const express = require('express');
const app = express();
const cors = require('cors');

// CORSポリシーを設定する
app.use(cors());

// APIエンドポイント
app.get('/api/get_prompt', async (req, res) => {
    const sendTheme = req.query.sendTheme;

    const gptResponse = await gpt.sendQuery(sendTheme);

    const data = {
        prompt: gptResponse
    };

    // JSON形式でレスポンスを返す
    res.json(data);
});

// ファイルを提供するディレクトリを指定する
app.use('/', express.static(__dirname + '/docs'));

// ファイルが見つからなかった場合のエラーハンドリング
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/error.html');
});

// サーバーを起動します
app.listen(3000, () => {
    console.log('Server alive! http://localhost:3000/index.html');
});

// SIGINTイベントが発生した場合にアプリケーションを終了する
process.on('SIGINT', () => {
    console.log('アプリケーションを終了します');
    process.exit(0);
});
