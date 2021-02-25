const express = require('express');
const { getCartBySessionId } = require('../controllers/cart-controller');

const router = express.Router();

router.get('/:id', getCartBySessionId);

module.exports = router;