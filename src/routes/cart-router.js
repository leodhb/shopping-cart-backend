const express = require('express');
const { getCartBySessionId, 
        deleteProductFromCart,
        getCartProduct, 
        addProductToCart } = require('../controllers/cart-controller');

const router = express.Router();

/* cart routes */
router.get('/:id', getCartBySessionId);
router.put('/:id', addProductToCart);
router.get('/:id/:item', getCartProduct);
router.delete('/:id/:item', deleteProductFromCart);

module.exports = router;