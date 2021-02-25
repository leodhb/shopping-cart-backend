const express = require('express');
const { getCartBySessionId, deleteProduct, addDummyCart, getCartProduct } = require('../controllers/cart-controller');

const router = express.Router();

/* testing */
router.post('/', addDummyCart);

/* cart */
router.get('/:id', getCartBySessionId);


router.get('/:id/:item', getCartProduct);
router.delete('/:id/:item', deleteProduct);

module.exports = router;