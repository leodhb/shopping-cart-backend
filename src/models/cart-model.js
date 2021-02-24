const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var itemSchema = new Schema({
    SKU: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: [1, 'A quantidade de produtos deve ser maior que 0']
    },
    unitValue: {
        type: Number,
        required: true
    }
});

// virtual attr for total value of items with same sku
itemSchema.virtual('totalValue')
    .get(() => {
        return this.qty * this.unitValue;
});

const cartSchema = new Schema({
        items: [itemSchema],
});


/* VIRTUAL VARIABLES FOR THE CART SCHEMA */
cartSchema.virtual('qtySKUs')
    .get(() => {
        return this.items.itemSchema.lenght;
});

cartSchema.virtual('totalPrice').get(function () {
    return this.items.map(p => p.totalValue).reduce((a, b) => a + b);
});

