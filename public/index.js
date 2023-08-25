$(document).ready(function () {
    $('#apiForm').submit(function (event) {
        event.preventDefault(); // フォームのデフォルトの動作をキャンセル

        var sendTheme = $('#sendTheme').val(); // 入力されたパラメーターを取得

        $('#response').text("送信中...");
        // AJAXリクエストを送信
        $.ajax({
            url: '/api/get_prompt',
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