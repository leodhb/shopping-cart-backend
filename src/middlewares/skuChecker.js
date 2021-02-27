const Product = require('../models/product/product-model');
const Cart    = require('../models/cart/cart-model');



const onTheProductList = (req, res) => {
    let singleSKU = false;
    try {
        singleSKU = Product.findOne({ "sku.id": req.body.sku})
        .then(result => {
            if(!result) {
                res.status(404).send({"error": `[SKUCHECKER] The product with SKU ${req.params.item} was not found on the SKU list`});
                return false;
            } else {
                return result.sku.find(sku => sku.id === req.body.sku)
            }
        });
        return singleSKU;
    } catch (error) {
        res.status(400).send({"error": `[SKUCHECKER] Error message: ${error.message}`});
    }
    return singleSKU;
}

const onTheCart = (req, res) => {
    let singleSKU = false;
    try {
        singleSKU = Cart.findOne({_id: req.params.id, "items.SKU": req.body.sku})
        .then(result => {
            if(!result) {
                return false;
            } else {
                return result.items.find(item => item.SKU === req.body.sku)
            }
        });
        return singleSKU;
    } catch (error) {
        res.status(400).send({"error": `[SKUCHECKER] Error message: ${error.message}`});
    }
    return singleSKU;
}



module.exports = {
    onTheProductList,
    onTheCart
};

