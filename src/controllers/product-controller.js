const Product = require('../models/product/product-model');
const { checkProductList } = require('../helpers/sku-checker');

const getAllProducts = (req, res) => {
    Product.find()
    .then(result => res.json(result))
    .catch(error => res.status(400).send({ "error": error }));
}

const insertProduct = async (req, res) => {
    try {
        let isSkuAlreadyRegistered = true;

        if (!req.body.sku) {
            throw new Error("products validation failed: sku: Path `sku` is required.");
        } else {
            isSkuAlreadyRegistered = await checkProductList(req.body.sku);
        }

        if (!req.body.sku.length) {
            throw new Error('products validation failed: sku: The product must have at least one SKU');
        } else if(isSkuAlreadyRegistered) {
            throw new Error('1 or many SKUs is already in use');
        } else {

            const product = new Product({
                name: req.body.name,
                image: req.body.image,
                sku: req.body.sku
            });
            
            const savedProduct = await product.save();
            res.json(savedProduct);
        }
    } catch (error) {
        res.status(400).send({ "error": error.message });
    }
}

const getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then(result => res.json(result))
        .catch(error => res.status(400).send({ "error": error }));

}

const deleteProduct = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id }, {new: true})
        .then(result => res.json(result))
        .catch(error => res.status(400).send({ "error": error }));
}

const updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { "_id": req.params.id }, 
        { "$set": 
            { "name": req.body.name, 
              "image": req.body.image, 
              "sku": [req.body.sku] 
            } 
        },
        {new: true})
        .then(result => res.json(result))
        .catch(error => res.status(400).send({ "error": error }));
}

module.exports = {
    getAllProducts,
    insertProduct,
    getProductById,
    deleteProduct,
    updateProduct
}