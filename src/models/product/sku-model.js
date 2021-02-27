const mongoose = require('mongoose');

const skuSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {_id: false});

module.exports = skuSchema;