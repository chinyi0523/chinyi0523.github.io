var send = require('./mail');

module.exports = function (myfriend, hr){
		// 設定寄信參數
	var mail = {
		// 發信人
		from: 'jeff5120721@gmail.com',
		// 主題
		subject: '激活碼(一小時後到期)',
		// 收信人
		to: myfriend,
		// 信件內容，HTML格式
		//text:一些內容
		html: hr //激活連結
	};
	send(mail);
};