const mongoose = require('mongoose');
const skuSchema = require('./sku-model');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sku: [skuSchema]
});

module.exports = mongoose.model('products', productSchema);