const mongoose = require('mongoose');
const itemSchema = require('./item-model');

let cartSchema = new mongoose.Schema({
        _id: {
            type: String,
            required: true
        },
        items: [itemSchema]
},
{id: false, toObject: {virtuals: true}, toJSON: {virtuals: true }});


cartSchema.virtual('skuQty').get(function () {
    return this.items.length;
});

cartSchema.virtual('totalCartValue').get(function () {
    if(this.items.length){
        const myTotalPrice = this.items.map(p => p.totalItemValue).reduce((a, b) => a + b);
        return Math.round((myTotalPrice) * 100) / 100;
    } else {
        return 0;
    }
});


module.exports = mongoose.model('cart', cartSchema);