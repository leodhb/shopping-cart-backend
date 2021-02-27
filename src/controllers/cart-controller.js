const Cart = require('../models/cart/cart-model');
const skuCheck = require('../middlewares/skuChecker');
const {quantityHandler} = require('../helpers');



/* GETS AN EXISTING CART BY USER SESSION ID (It'll be created if not exists) */
const getCartBySessionId = async (req, res) => {
    let cart = null;
    try {
        const isCartCrated = await Cart.exists({_id: req.params.id});
        isCartCrated ? 
            cart = await Cart.findById(req.params.id) : 
            cart = await createCart(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(400).send({error: `[CART] Falha ao tentar acessar o carrinho: ${error.message}`});
    }
}

/* CREATE A NEW CART BASED ON USER SESSION ID (Function called by getCartBySessionId method) */
const createCart = async (id) => {
    let createdCart = null;
    const cart = new Cart({ _id: id , items: [] });
    createdCart = await cart.save().catch(err => {res.status(400).send({error: `[CART] Erro ao tentar criar carrinho: ${err.message}`})});
    return createdCart;
}

/* GETS A PRODUCT FROM THE CART BY SKU PARAM (Eg.: [GET] localhost/api/cart/{cartId}/{skuId} ) */
const getCartProduct = async (req, res) => {
    try {
        await Cart.findOne({_id: req.params.id}).then((result) => {
            const singleProduct = result.items.find(item => item.SKU === req.params.item);
            singleProduct ? 
                res.json(singleProduct) : 
                res.status(404).send({"error": `The product with SKU ${req.params.item} was not found on this cart`});
        });
    } catch (error) {
        res.status(400).send({"error": error.message});
    }
}

/* DELETE A PRODUCT CART BY ID PARAM (Eg.: [DELETE] localhost/api/cart/{cartId}/{skuId} ) */
const deleteProductFromCart = async (req, res) => {
    await Cart.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { items: { SKU: req.params.item } } },
        { new: true })
        .then(result => res.json(result))
        .catch(err => {res.status(400).send({"error": `[CART] Erro ao tentar deletar: ${err.message}`})});;
}

/* ADD PRODUCT TO CART BY PASSING SKU AND QTY {if already exists on cart it'll just increase/decrease the qty} */
const addProductToCart = async (req, res) => {
    const skuOnProductList = await skuCheck.onProductList(req, res);
    const skuOnCart        = await skuCheck.onCart(req, res);

    if(skuOnProductList) {
        if(!skuOnCart) {
            let skuQuantity = quantityHandler(req.body.qty, skuOnProductList.inventory);
            const newCartItem = {"SKU": skuOnProductList.id, "qty": skuQuantity, "unitValue": skuOnProductList.price};

            await Cart.findOne({_id: req.params.id}).then(cart => {
                cart.items.push(newCartItem);
                cart.save();
                res.json(cart);
            }).catch(err => {res.status(400).send({"error": `[CART] Erro ao tentar atualizar: ${err.message}`})});;
       } else {
            updateCartProduct(req, res);
       }
    }
}

/* INCREASE OR DECREASE PRODUCT QTY ON CART {it'll be inserted if not exists on cart} */
const updateCartProduct = async (req, res) => {
    const skuOnProductList = await skuCheck.onProductList(req, res);
    const skuOnCart        = await skuCheck.onCart(req, res);

    if(skuOnCart) {
            let skuQuantity = quantityHandler((skuOnCart.qty + req.body.qty), skuOnProductList.inventory);

            await Cart.findOne({_id: req.params.id}).then(cart => {
                const objIndex = cart.items.findIndex(obj => obj.SKU === req.body.sku);
                cart.items[objIndex].qty = skuQuantity;
                cart.save();
                res.json(cart);
            }).catch(err => {res.status(400).send({"error": `[CART] Erro ao tentar atualizar: ${err.message}`})});

    } else {
        addProductToCart(req, res);
    }
}

const findOnCart = Cart.findOne;

module.exports = {
    getCartBySessionId,
    deleteProductFromCart,
    getCartProduct,
    addProductToCart,
    updateCartProduct,
    findOnCart
}