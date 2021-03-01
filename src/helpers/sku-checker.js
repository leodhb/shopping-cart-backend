const Product = require('../models/product/product-model');
const Cart = require('../models/cart/cart-model');

const getSkuFromProductList = (skuId) => {
    if (typeof skuId === 'undefined') {
        return false;
    }
    let singleSKU = Product.findOne(
        { 'sku.id': skuId},
        { 'sku.$': 1 },
        {new: true}
    ).then(result => result ? result.sku[0] : false);
    return singleSKU;
}

const getSkuFromCart = (skuId) => {
    if (typeof skuId === 'undefined') {
        return false;
    }
    let singleSKU = Cart.findOne(
        { 'items.SKU': skuId},
        { 'items.$': 1 },
        {new: true}
    ).then(result => result ? result.items[0] : false);
    return singleSKU;
}

const checkProductList = async (obj) => {
    let SKUS = [];
    await obj.map(async (sku) => {
        SKUS = [...SKUS, sku.id];
    });
    const result = await Product.exists({ "sku.id": { $in: SKUS } });
    return result;
}

module.exports = {
    getSkuFromProductList,
    getSkuFromCart,
    checkProductList
};

