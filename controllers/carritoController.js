// Importar los modelos
const factura = require('../models/factura');
const productoCarrito = require('../models/productoCarrito')
var Cart = require('../models/cart')
const inventario = require('../models/Inventario')

exports.crearCarrito = async (req, res) => {
    var productId = req.params.id;  
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    const inv = inventario.findByPk(productId);
    const [invent] = await Promise.all([inv]).then();
    console.log(invent.nombre)
    if(!invent){
        return res.redirect('/');
    }else{
        cart.add(invent, productId);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/productos')
        
    }
};


exports.verCarrito = async (req, res) => {
    if(!req.session.cart){
        return res.render('carrito',{
            products: null,
            nombrePagina : 'Tu carrito'
        })
    }else{
        var cart = new Cart(req.session.cart);
        var subtotal = cart.totalPrice/1.15
        var impuesto = subtotal * 0.15
        res.render('carrito',{
            products: cart.generateArray(),
            subtotal: subtotal.toFixed(2),
            impuesto : impuesto.toFixed(2),
            totalPrice: cart.totalPrice.toFixed(2),
            nombrePagina : 'Tu carrito'
        })
    }
};


exports.quitarUno = async (req, res) => {
    var productId = req.params.id;  
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log("Wasaa")
    console.log(productId)
    cart.reduceByOne(productId);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/carrito')
        
    
};


exports.quitarProducto = async (req, res) => {
    var productId = req.params.id;  
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    console.log(productId)
    await cart.removeItem(productId);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/carrito')
        
};
