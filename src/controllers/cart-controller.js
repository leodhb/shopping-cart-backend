const Cart = require('../models/cart-model');

const getCartBySessionId = async (req, res) => {
    try {
        let cart = null;
        const isExistingCart = await Cart.exists({_id: req.params.id}); //true se o carrinho já existir na collection
        console.log("[API]: O CARRINHO " + req.params.id + " EXISTE?", isExistingCart);

        if(!isExistingCart) {
            cart = await createCart(req.params.id);
        } else {
            cart = await Cart.findById(req.params.id);
        }
        res.json(cart);
    } catch (error) {
        res.status(400).send({"Erro ao tentar consultar carrinho:": error.message});
    }
}


/* AUX FUNCTION */
const createCart = async (id) => {
    console.log('[API]: entrou na criacao do carrinho com o id', id);
    let savedCart = null;
    const cart = new Cart({
        _id: id,
        items: []
    });

    try {
        savedCart = await cart.save();
        console.log('[CART] Carrinho criado');
        console.log(savedCart);
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
    return savedCart;
}


const addDummyCart = async (req, res) => {
    const cart = new Cart({
        _id: "tijolo",
        items: req.body.items
    });
    try {
        const savedCart = await cart.save();
        res.json(savedCart);
        console.log(savedCart)
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
}


const getCartProduct = async (req, res) => {
    try {
        await Cart.findOne({_id: req.params.id}).then((result) => {
        let singleProduct = result.items.filter(product => {
                if(product.SKU == req.params.item)
                {
                    return product;
                }
        });
        if(Array.isArray(singleProduct) && singleProduct.length) {
            res.json(singleProduct);
        } else {
            res.status(404).send({"error": `The product with SKU ${req.params.item} was not found on this cart`});
        }
        
        })
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
    
}

const deleteProduct = async (req, res) => {
    await Cart.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { items: { SKU: req.params.item } } },
        { new: true }
      )
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

module.exports = {
    getCartBySessionId,
    deleteProduct,
    addDummyCart,
    getCartProduct
}