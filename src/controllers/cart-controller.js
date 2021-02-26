const Cart = require('../models/cart-model');
const skuChecker = require('../middlewares/skuChecker');

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
        return {error: "deu ruim"}
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

const deleteProductFromCart = async (req, res) => {
    await Cart.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { items: { SKU: req.params.item } } },
        { new: true }
      )
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

const addProductToCart = async (req, res) => {
    const skuOnProductList = await skuChecker.onTheProductList(req, res);
    const skuOnCart        = await skuChecker.onTheCart(req, res);
    
    console.log(skuOnProductList);
    console.log(skuOnCart);
    
    if(skuOnProductList)
    {
        if(!skuOnCart) {
            const newCartItem = {"SKU": skuOnProductList.id, "qty": req.body.qty, "unitValue": skuOnProductList.price};

            await Cart.findOne({_id: req.params.id}).then(cart => {
                cart.items.push(newCartItem);
                cart.save();
                res.json(cart);
            });
       } else {
            const newQty = skuOnCart.qty + req.body.qty;
            
            await Cart.findOne({_id: req.params.id}).then(cart => {
                const objIndex = cart.items.findIndex(obj => obj.SKU === req.body.sku);
                console.log(objIndex);

                cart.items[objIndex].qty = newQty;

                cart.save();
                res.json(cart);
            });
        }
    }
}


module.exports = {
    getCartBySessionId,
    deleteProductFromCart,
    addDummyCart,
    getCartProduct,
    addProductToCart
}