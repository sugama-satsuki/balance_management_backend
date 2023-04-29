const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        require: true
    },
    title: {
        type: String,
        required: true,
        max: 100
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        // refPath: 'categoryType',
        required: true
    },
    isTypeIncome: {
        type: Boolean,
        require: true
    },
    memo: {
        type: String,
        required: false,
        max: 500
    },
    // categoryType: { type: String, enum: ['Category'] }
})


module.exports = mongoose.model('Data', DataSchema);