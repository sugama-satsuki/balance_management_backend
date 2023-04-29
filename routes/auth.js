const router = require('express').Router();
const User = require('../models/User');


// user登録
router.post('/register', async (req, res) => {
    try {

        const newUser = await new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })

        // 保存
        const user = await newUser.save();

        return res.status(200).json(user);

    } catch(err) {
        // 500ステータスとerrが返される
        return res.status(500).json(err);
    }
});

// ログイン
router.post('/login', async (req, res) => {
    try {
        // 一致するUserを探す（requestのemailに一致するUser）
        const user = await User.findOne({email: req.body.email});

        // 見つからなかった場合
        if(!user){
            console.log('ユーザーが見つかりません。')
            return res.status(404).send('ユーザーが見つかりません。');
        }
        // パスワードの確認
        const vailedPass = req.body.password === user.password;

        if(!vailedPass) res.status(400).send('パスワードが違います');

        return res.status(200).json(user);

    }catch(err) {
        return res.status(500).json(err);
    }
})

// 外部から使えるように、exports
module.exports = router;