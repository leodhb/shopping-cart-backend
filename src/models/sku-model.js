const mongoose = require('mongoose');


const skuSchema = mongoose.Schema({
    sku: {
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
});

module.exports = skuSchema;