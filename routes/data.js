const router = require('express').Router();
const Category = require('../models/Category');
const Data = require('../models/Data');
const User = require('../models/User');

router.get('/', async (req, res) => {
    res.send("hello data");
});


// データ登録
router.post('/register', async (req, res) => {
    try {

        const newData = await new Data({
            userId: req.body.userId,
            date: req.body.date,
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            isTypeIncome: req.body.isTypeIncome,
            memo: req.body.memo
        })

        console.log(newData);
        // 保存
        const data = await newData.save();
        console.log(data);
        if(!data) res.status(400).json("登録に失敗しました");

        return res.status(200).json(data);

    } catch(err) {
        // 500ステータスとerrが返される
        return res.status(500).json(err);
    }
});


// 特定のデータを1件のみ取得
router.get('/:id', async (req, res) => {
    try {

        const data = await Data.findById(req.params.id);

        if(!data) res.status(404).json("データが見つかりませんでした。");

        return res.status(200).json(data);

    } catch(err) {
        // 500ステータスとerrが返される
        return res.status(500).json(err);
    }
});


// TODO: 特定のデータを1件のみ取得（日付で）
router.get('/get/:date', async (req, res) => {
    try {

        const data = await Data.find({ date: req.params.date });

        if(!data) res.status(404).json("データが見つかりませんでした。");

        return res.status(200).json(data);

    } catch(err) {
        // 500ステータスとerrが返される
        return res.status(500).json(err);
    }
});


// データを編集する
router.put('/:id', async (req, res) => {
    try {
        // /:idのidに指定されたidに紐づくデータ取得
        const data = await Data.findById(req.params.id);

        if(data.userId === req.body.userId) {
            await data.updateOne({
                $set: req.body
            })

            return res.status(200).json('更新しました。')
        }else{
            return res.status(403).json('他のユーザーのデータを修正できません。');
        }

    }catch(err) {
        return res.status(403).json(err);
    }
})

// データを削除する
router.delete('/:idArr', async (req, res) => {
    try {
        const idArr  = JSON.parse(req.params.idArr);

        // /:idのidに指定されたidに紐づくデータ取得
        const data = await Data.findById(idArr[1].id);
        // const data = await Data.findById(req.params.id);

        if(data.userId === req.body.userId) {
            await data.deleteOne();
            return res.status(200).json('削除に成功しました！');
        }else{
            return res.status(403).json('他のユーザーのデータを修正できません。');
        }

    }catch(err) {
        return res.status(403).json(err);
    }
})


// 収入を全て取得
router.get('/income/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        // const incomeData = await Data.find({userId: user._id, isTypeIncome: true});
        const incomeData = await Data.aggregate([
            {
                $match: {
                    userId: user._id.toString(),
                    isTypeIncome: true
                }
            },
            // {
            //     $lookup: {
            //         from: 'categories',
            //         localField: {category:'category'},
            //         foreignField: 'category_key',
            //         as: 'category',
            //     }
            // }
        ]);


        if(!incomeData) res.status(404).json("データが見つかりませんでした。")

        return res.status(200).json(incomeData);
    }catch(err) {
        return res.status(500).json(err);
    }
})

// 支出を全て取得
router.get('/expenses/:userId', async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const incomeData = await Data.find({userId: user._id, isTypeIncome: false});
        return res.status(200).json(incomeData);
    }catch(err) {
        console.log(err)
        return res.status(500).json(err);
    }
})


// 外部から使えるように、exports
module.exports = router;