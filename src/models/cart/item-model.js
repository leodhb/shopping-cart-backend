const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
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

module.exports = itemSchema;