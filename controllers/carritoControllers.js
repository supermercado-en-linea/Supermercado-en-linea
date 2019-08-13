// Importar los modelos
const factura = require('../models/factura');
const productoCarrito = require('../models/productosCarrito');
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

    // Verificar si el nombre del proyecto tiene un valor
    if (!idCliente && !estado && !numeroProductos && !total) {
        errores.push({'texto': 'El nombre del proyecto no puede ser vacío.'});
    }

    // Si hay errores
   
        if (errores.length > 0) {
            console.log(errores)
            res.render('inventario/verInventario');
        }else{
            let newArticle = new Carrito({
                        idCliente:idCliente,
                        estado:estado,
                        numeroProductos:numeroProductos,
                        total:total
            });
    
            await Carrito.create({idCliente: newArticle.idCliente, estado: newArticle.estado, numeroProductos: newArticle.numeroProductos, total: newArticle.total});
            //res.redirect('verInventario');
            if()
        }
};
exports.carrito = async (req, res) => {
    // Obtener todos los proyectos
    // const inventario = await inventario.findAll(); 
    res.render('inventario/carrito');
}; 
exports.crearCarrito = async (req, res)=>{
    const categoriaPromise = Categoria.findAll();

    const [categorias] = await Promise.all([categoriaPromise]).then();
    res.render('inventario/crearCarrito',{categorias});
};

