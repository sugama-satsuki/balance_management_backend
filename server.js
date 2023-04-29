const express = require('express');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const categoryRoute = require('./routes/category');
const dataRoute = require('./routes/data');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');

require('dotenv').config();


// MongoDBに接続
mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log('DB接続中。。。');
}).catch((err) => {
    console.log(err);
})

app.get('/', (req, res) => {
    res.send('hello express');
})

// ミドルウェアの設定
// エンドポイントの設定
app.use(express.json());                    // jsonを使うよって
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/data', dataRoute);
app.use('/api/category', categoryRoute);


app.listen(PORT, () => {
    console.log('サーバーが立ち上がった。');
})