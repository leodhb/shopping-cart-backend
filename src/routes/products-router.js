const express = require('express');
const { getAllProducts, insertProduct, getProductById, deleteProduct, updateProduct } = require('../controllers/product-controller');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', insertProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

module.exports = router;