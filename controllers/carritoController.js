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
        res.redirect('/inventario/verInventario')
        
    }
};
