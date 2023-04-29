const router = require('express').Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    res.send("hello data");
});


// データ登録
router.post('/register', async (req, res) => {
    try {

        const newCategory = await new Category({
            category_key: req.body.category_key,
            label: req.body.label,
            color: req.body.color,
            isActive: req.body.isActive
        })

        // 保存
        const data = await newCategory.save();
        if(!data) res.status(400).json("登録に失敗しました");

        return res.status(200).json(data);

    } catch(err) {
        // 500ステータスとerrが返される
        return res.status(500).json(err);
    }
});


// データ取得
router.get('/allData', async(req, res) => {
    try {
        const category = await Category.find();

        if(!category) res.status(404).json("データが見つかりませんでした。")

        return res.status(200).json(category);
    }catch(err) {
        return res.status(500).json(err);
    }
})


// 外部から使えるように、exports
module.exports = router;