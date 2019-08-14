// Importar los modelos
const factura = require('../models/factura');
const detalleFactura = require('../models/detalleFactura')
var Cart = require('../models/cart')

exports.nuevaFactura = async (req, res) => {
    if(!req.session.cart){
        return res.render('factura/factura',{
            products: null,
            nombrePagina : 'Factura'
        })
    }else{
        var cart = new Cart(req.session.cart);
        var subtotal = cart.totalPrice/1.15
        var impuesto = subtotal * 0.15
        res.render('factura/factura',{
            products: cart.generateArray(),
            subtotal: subtotal.toFixed(2),
            impuesto : impuesto.toFixed(2),
            totalPrice: cart.totalPrice.toFixed(2),
            nombrePagina : 'Factura'
        })
    }
};

exports.generarFactura = async (req, res) => {
    var cart = new Cart(req.session.cart);
    var subtotal = cart.totalPrice/1.15
    var impuesto = subtotal * 0.15

    await factura.create({subTotal: subtotal.toFixed(2), isv: impuesto.toFixed(2), estado: 1,total: cart.totalPrice.toFixed(2), ClienteId: 1 })
    const idFact = await factura.findOne({
        where: {
            estado: 1
        }
    });
    
    let productos = cart.generateArray();
    
    console.log(idFact.id);
    for (producto in productos){
        await detalleFactura.create({cantidad: productos[producto].qty, nombre: productos[producto].item.nombre, precioUnitario: productos[producto].item.precioVenta, total: productos[producto].price,facturaId: idFact.id})
        console.log(productos[producto].item.nombre)
    }
    await factura.update(
        { estado: 0 },
        { where : {
            id : idFact.id
        }
    });

    req.session.cart = null
    res.redirect('/');
};
