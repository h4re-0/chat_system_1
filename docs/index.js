$(document).ready(function () {
    $('#apiForm').submit(function (event) {
        event.preventDefault(); // フォームのデフォルトの動作をキャンセル

        var sendTheme = $('#sendTheme').val(); // 入力されたパラメーターを取得

        $('#response').text("送信中...（サーバーがスリープ状態の場合、起動に数十秒かかることがあります。）");

        var url = '';
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            // localhostへのアクセスの場合の処理
            url = '/api/get_prompt';
            console.log("Local Access. Using local api.")
        } else {
            // ネット上へのアクセスの場合の処理
            url = 'https://h4re-chat-system-1.onrender.com:3000/api/get_prompt';
        }
        
        // AJAXリクエストを送信
        $.ajax({
            url: url,
            method: 'GET',
            data: { sendTheme: sendTheme },
            success: function (response) {
                console.log(response);
                // 成功した場合、レスポンスを表示
                $('#response').text(response.prompt);
            },
            error: function (error) {
                // エラーが発生した場合、エラーメッセージを表示
                $('#response').text('エラーが発生しました: ' + error.statusText);
            }
        });
    });
});