const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let itemSchema = new Schema({
    SKU: {
      type: String,
    },
    qty: {
      type: Number
    },
    unitValue: {
        type: Number,
    },
    totalItemValue: {
        type: Number,
        default: function() {
            return this.qty * this.unitValue
        }
    }
},
{_id: false});


let cartSchema = new Schema({
        _id: {
            type: String,
            required: true,
            unique : true
        },
        items: [itemSchema],
        totalCartValue: {
            type: Number,
            default: function() {
                if(this.items.length)
                {
                    return this.items.map(p => p.totalItemValue).reduce((a, b) => a + b);
                } else {
                    return 0;
                }
                
            }
        },
        skuQty: {
            type: Number
        }
});

cartSchema.pre('validate', function (next) {
    this.skuQty = this.items.length
    next();
});

module.exports = mongoose.model('cart', cartSchema);