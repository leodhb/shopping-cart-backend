const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema({
    SKU: {
      type: String,
    },
    qty: {
      type: Number,
    },
    unitValue: {
        type: Number,
    },
},
{_id: false, id: false, toObject: {virtuals: true}, toJSON: {virtuals: true }});


itemSchema.virtual('totalItemValue').get(function () {
    return Math.round((this.qty * this.unitValue) * 100) / 100;
});

let cartSchema = new Schema({
        _id: {
            type: String,
            required: true
        },
        items: [itemSchema],
        totalCartValue: {
            type: Number,
            default: 0
        },
        skuQty: {
            type: Number,
            default: 0
        }
});


cartSchema.pre('validate', function (next) {
    this.skuQty = this.items.length;
    if(this.items.length){
        const myTotalPrice = this.items.map(p => p.totalItemValue).reduce((a, b) => a + b);
        this.totalCartValue = parseFloat((myTotalPrice).toFixed(2));
    }
    next();
});

module.exports = mongoose.model('cart', cartSchema);