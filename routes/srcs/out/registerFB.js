//srcs/register.js
var user_l_Schema = require('../../Schemas/user_login');
var crypto = require("crypto");

/*新增一筆使用者資料*/
function insert(name, account, facebookID, file) {
    //格式
    var user = new user_l_Schema({
        username: name,
        account: account,
        facebookID: facebookID,
        img: {
            data: file.buffer,
            contentType: file.mimetype
        }
    });
    console.log('img=', user.img)
    user.save(function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('成功儲存：', user);
            console.log(res);
        }
    })
}

module.exports = function (req, res) {
    var UserName = req.body.username;
    var Useraccount = req.body.account.toLowerCase();
    var UserFbId = req.body.facebookID;

    console.log('file\n', req.file)

    //查詢用戶是否存在
    var query = { account: Useraccount };
    user_l_Schema.find(query, function (err, obj) {
        if (err) {
            console.log("Error:" + err);
            return res.send({ status: 'success', message: false, description: "資料庫錯誤" });
        }
        else {
            if (obj.length == 0) {
                console.log("新增帳號");
                insert(UserName, Useraccount, UserFbId, req.file);
                res.send({ status: 'success', message: true, data: UserName })
            } else {
                console.log("已有此帳號");
                res.send({ status: 'success', message: false, description: "帳號已存在" })
            }
        }
    })
}