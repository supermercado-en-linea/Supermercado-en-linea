// Importar los modelos
const carrito = require('../models/carrito');
const productoCarrito = require('../models/productoCarrito');
const Inventario = require('../models/Inventario');
const Categoria = require('../models/Categoria');

exports.crearCarrito = async (cliente,nombre,precio,cantidad,total) => {


    // Validar que el input del formulario traiga un valor
    
    const idCliente = cliente;
    const estado = "1";
    const numeroProductos = 1;
    const nombre = nombre;
    const precio = precio;
    const cantidad = cantidad;
    
    const total = total;
    let errores = [];



            let newCarrito = new carrito({
                        idCliente:idCliente,
                        estado:estado,
                        numeroProductos:numeroProductos,
                        total:total
            });
    
            await carrito.create({idCliente: 1, estado: "1", numeroProductos: 1, total: 123});
            crearProductoCarrito(nombre, precio, cantidad);
            //res.redirect('verInventario');
            
}

exports.carrito = async (req, res) => {
    // Obtener todos los proyectos
    // const inventario = await inventario.findAll(); 
    res.render('inventario/carrito');
};

async function crearProductoCarrito(nombre, precio, cantidad){

}
