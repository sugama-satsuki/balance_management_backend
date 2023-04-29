const router = require('express').Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    res.send("hello user");
});

// 外部から使えるように、exports
module.exports = router;