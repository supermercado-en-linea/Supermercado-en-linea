// Importar los modelos
const Inventario = require('../models/Inventario');
const Categoria = require('../models/Categoria');

//importar convertidor a pug
const html2pug = require('html2pug')

//var markdown = require('marked');

exports.inventariosHome = async (req, res) => {
    // Obtener todos los proyectos
    // const inventario = await inventario.findAll(); 
    res.render('inventario/inventario');
}; 
exports.carrito = async (req, res) => {
    // Obtener todos los proyectos
    // const inventario = await inventario.findAll(); 
    res.render('inventario/carrito');
}; 
exports.crearInventario = async (req, res)=>{
    const categoriaPromise = Categoria.findAll();

    const [categorias] = await Promise.all([categoriaPromise]).then();
    res.render('inventario/crearInventario',{categorias});
};

exports.inventarioHome2 = async(req, res) =>{
    const inventariosPromise = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPromise]).then();
    console.log('hola');
    res.render('productos',{inventarios});
}

exports.nuevoInventario = async (req, res) => {

    const nombre = req.body.nombre;
    const content = req.body.content;
    const costo = req.body.costo;
    const precio = req.body.precio;
    const cantidad = req.body.stock;
    //const Categoria = 
   
    let errores = [];
    
    if (!nombre && !content && !costo && !precio && !cantidad  ) {
        errores.push({'texto': 'Se encotraron errores'});
    }
   
    if (errores.length > 0) {
        console.log(errores)
        res.render('inventario/crearInventario');
    }else{
        let newArticle = new Inventario({
                    nombre:nombre,
                    descripcion:content,
                    costoUnitario:costo,
                    precioVenta: precio,
                    stock: cantidad
        });

        await Inventario.create({nombre: newArticle.nombre, descripcion: newArticle.descripcion, costoUnitario: newArticle.costoUnitario, precioVenta: newArticle.precioVenta,stock:newArticle.stock});
        res.redirect('verInventario');
    }
}

exports.inventarioPorUrl = async (req, res) => {

    const inventariosPromise = Inventario.findOne({
        where : {
            url : req.params.url
        }
    });

    const [inventario] = await Promise.all([inventariosPromise]).then();
    
    res.render('inventario',{
        inventario
    });

}



/* exports.CCC = function(req, res){
    res.render('inventario/CrearInventario');

} */