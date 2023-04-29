const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category_key: {
        type:Number,
        require: true,
        unique: true
    },
    label: {
        type: String,
        required: true,
        max: 100
    },
    color: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('Category', CategorySchema);