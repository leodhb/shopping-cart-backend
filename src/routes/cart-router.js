const express = require('express');
const { getCartBySessionId, 
        deleteProductFromCart, 
        addDummyCart, 
        getCartProduct, 
        addProductToCart } = require('../controllers/cart-controller');

const router = express.Router();

/* testing */
router.post('/', addDummyCart);

/* cart */
router.get('/:id', getCartBySessionId);
router.put('/:id', addProductToCart);
router.get('/:id/:item', getCartProduct);
router.delete('/:id/:item', deleteProductFromCart);

module.exports = router;