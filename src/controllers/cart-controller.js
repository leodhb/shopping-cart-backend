const Cart = require('../models/cart/cart-model');
const { getSkuFromProductList, getSkuFromCart } = require('../helpers/sku-checker');
const quantityHandler = require('../helpers/quantity-handler');

/* [GET] localhost/api/cart/{cartId} */
const getCartBySessionId = async (req, res) => {
    try {
        const isCartCrated = await Cart.exists({ _id: req.params.id });
        const cart = isCartCrated ? await Cart.findById(req.params.id) : await createCart(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(400).send({ error: `[CART] Falha ao tentar acessar o carrinho: ${error.message}` });
    }
}

/* Function called by getCartBySessionId method if cart not exists */
const createCart = (id) => {
    const myNewCart = new Cart({ _id: id, items: [] });
    const createdCart = myNewCart.save().catch(err => { res.status(400).send({ error: `[CART] Erro ao tentar criar carrinho: ${err.message}` }) });
    return createdCart;
}

/*  [GET] localhost/api/cart/{cartId}/{skuId} */
const getCartProduct = (req, res) => {
    Cart.findOne({ _id: req.params.id }).then((result) => {
        const singleProduct = result.items.find(item => item.SKU === req.params.item);
        singleProduct ?
            res.json(singleProduct) :
            res.status(404).send({ "error": `The product with SKU ${req.params.item} was not found on this cart` });
    });
}

/*  [DELETE] localhost/api/cart/{cartId}/{skuId} */
const deleteProductFromCart = (req, res) => {
    Cart.findOneAndUpdate(
        { "_id": req.params.id },
        {
            "$pull": {
                "items": { "SKU": req.params.item }
            }
        },
        { new: true })
        .then(result => res.json(result))
        .catch(err => { res.status(400).send({ "error": `[CART] Erro ao tentar deletar: ${err.message}` }) });;
}

/* if already exists on cart it'll just increase/decrease the qty*/
const addProductToCart = async (req, res) => {
    const skuOnProductList = await getSkuFromProductList(req, res);

    if (skuOnProductList) {
        let skuQuantity = quantityHandler(req.body.qty, skuOnProductList.inventory);
        const newCartItem = { "SKU": skuOnProductList.id, "qty": skuQuantity, "unitValue": skuOnProductList.price };

        Cart.findOneAndUpdate(
                { "_id": req.params.id, "items.SKU": {"$ne": req.body.sku} },
                {
                    "$push": { "items": newCartItem }
                },
                { new: true }
            ).then(result => result ? res.json(result) : updateCartProduct(req, res));
    }
}

/* it'll be inserted if not exists on cart */
const updateCartProduct = async (req, res) => {
    const skuOnProductList = await getSkuFromProductList(req, res);
    const skuOnCart = await getSkuFromCart(req, res);

    if (skuOnCart) {
        let skuQuantity = quantityHandler((skuOnCart.qty + req.body.qty), skuOnProductList.inventory);

        Cart.findOneAndUpdate(
            { "_id": req.params.id, "items.SKU": req.body.sku },
            {
                "$set": {
                    "items.$.qty": skuQuantity
                }
            },
            { new: true })
            .then(result => res.json(result));

    } else {
        addProductToCart(req, res);
    }
}

module.exports = {
    getCartBySessionId,
    deleteProductFromCart,
    getCartProduct,
    addProductToCart,
    updateCartProduct
}