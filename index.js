const gpt = require('./gpt');

const express = require('express');
const app = express();

// HTMLファイルを返すルートエンドポイント
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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

// 画像ファイルを提供するディレクトリを指定する
app.use('/', express.static(__dirname + '/public'));

// ファイルが見つからなかった場合のエラーハンドリング
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/error.html');
});

// サーバーを起動します
app.listen(3000, () => {
    console.log('http://localhost:3000/');
});

// SIGINTイベントが発生した場合にアプリケーションを終了する例
process.on('SIGINT', () => {
    console.log('アプリケーションを終了します');
    process.exit(0);
});