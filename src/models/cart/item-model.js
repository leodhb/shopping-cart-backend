const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  SKU: {
    type: String,
    required: true,
    unique: true
  },
  qty: {
    type: Number,
    required: true,
  },
  unitValue: {
    type: Number,
    required: true,
  },
},
  { _id: false, id: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });


itemSchema.virtual('totalItemValue').get(function () {
  return Math.round((this.qty * this.unitValue) * 100) / 100;
});

module.exports = itemSchema;