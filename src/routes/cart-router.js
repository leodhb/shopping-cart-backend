const express = require('express');
const { getCartBySessionId,
        deleteProductFromCart,
        getCartProduct,
        addProductToCart,
        updateCartProduct } = require('../controllers/cart-controller');

const router = express.Router();

/* cart routes */
router.get('/:id', getCartBySessionId);
router.put('/:id', addProductToCart);
router.patch('/:id', updateCartProduct);
router.get('/:id/:item', getCartProduct);
router.delete('/:id/:item', deleteProductFromCart);

module.exports = router;