const Product = require('../models/product/product-model');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(400).send({"error": error});
    }
}

const insertProduct = async (req, res) => {
    const product = new Product({
        name:  req.body.name,
        image: req.body.image,
        sku: req.body.sku
    });

    try {
        if(!req.body.sku) {
            throw new Error("products validation failed: SKU: Path `SKU` is required.");
        } else if(!req.body.sku.length){
            throw new Error('The product must have at least one SKU');
        } else {
            const savedProduct = await product.save();
            res.json(savedProduct);
        }
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
}

const getProductById = async (req, res) => {
    try {
        const singleProduct = await Product.findById(req.params.id);
        res.json(singleProduct);
    } catch (error) {
        res.status(400).send({"error": error});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.remove({_id: req.params.id});
        res.json(deletedProduct);
    } catch (error) {
        res.status(400).send({"error": error});
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne({_id: req.params.id}, { $set: {name: req.body.name, image: req.body.image, sku: [req.body.sku]}});
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send({"error": error});
    }
}


module.exports = {
    getAllProducts,
    insertProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    addProduct
}