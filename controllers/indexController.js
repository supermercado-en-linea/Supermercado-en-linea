// Importar el modelo
//const Proyecto = require('../models/Proyecto');
const Inventario = require('../models/Inventario');
var Cart = require('../models/cart')

exports.paginaPrincipal =  async(req, res) => {
    if(!req.session.cart){
        return res.render('index',{
            products: null,
            nombrePagina : 'Inicio'
        })
    }else{
        var cart = new Cart(req.session.cart);
        res.render('index',{
            products: cart.generateArray(),
            totalPrice: cart.totalPrice.toFixed(2),
            nombrePagina : 'Inicio'
        })
    }
};

exports.productos =  async(req, res) => {
    const inventariosPromise = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPromise]).then();

    if(!req.session.cart){
        return res.render('productos',{
            inventarios,
            products: null,
            nombrePagina : 'Productos'
        })
    }else{
        var cart = new Cart(req.session.cart);
        res.render('productos',{
            inventarios,
            products: cart.generateArray(),
            totalPrice: cart.totalPrice.toFixed(2),
            nombrePagina : 'Productos'
        })
    }
};

exports.formulario= async(req,res)=>{
    res.render('formularios');

};

exports.contacto =  async(req, res) => {

    if(!req.session.cart){
        return res.render('contactanos',{
            products: null,
            nombrePagina : 'Contáctanos'
        })
    }else{
        var cart = new Cart(req.session.cart);
        res.render('contactanos',{
            products: cart.generateArray(),
            totalPrice: cart.totalPrice.toFixed(2),
            nombrePagina : 'Contáctanos'
        })
    }
};
