const Product = require('../models/product-model');

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
        sku: [req.body.sku]
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
        console.log(savedProduct)
    } catch (error) {
        res.status(400).send({"error": error});
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

const addProduct = async (req, res) => {
    
}


module.exports = {
    getAllProducts,
    insertProduct,
    getProductById,
    deleteProduct,
    updateProduct,
    addProduct
}