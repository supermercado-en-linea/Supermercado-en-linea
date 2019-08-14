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
    
/*   
    *///res.render('inventario/crearInventario',{categorias});
   // res.render('productos',{inventarios},{categorias});
   res.render('inventario/mostrarInventario',{inventarios});

}
exports.ver =async(req,res)=>{
    
    res.redirect('/productos/'+req.params.url);

}

exports.nuevoInventario = async (req, res) => {
    console.log(req.body.categoria1);
    const categoria = await Categoria.findOne({
        where : {
            idCategoria : req.body.categoria1
        }
    });

    const idCategoria =  categoria.idCategoria;
    const nombre = req.body.nombre;
    const content = req.body.content;
    const costo = req.body.costo;
    const precio = req.body.precio;
    const cantidad = req.body.stock;
    //const idCategoria = req.body.categoria1;
    //const Inventario = 
   
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
                    stock: cantidad,
                    categoriainventarioIdCategoria:idCategoria
        });

        await Inventario.create({nombre: newArticle.nombre, descripcion: newArticle.descripcion, costoUnitario: newArticle.costoUnitario, precioVenta: newArticle.precioVenta,stock:newArticle.stock,categoriainventarioIdCategoria:newArticle.categoriainventarioIdCategoria});
        res.redirect('mostrarInventario');
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




exports.eliminarInventario = async (req, res,next) => {
    const { id } = req.params;
    const inventariosPromise = await Inventario.destroy({
        where : {
            idInventario : id
        }
    });

    if(!inventariosPromise){
        return next();
    }
    console.log('Articulo Eliminado Exitosamente');
    //res.render('inventario/verInventario');
    const inventariosPro = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPro]).then();
    res.render('inventario/mostrarInventario',{inventarios});
    
}
exports.editarInventario = async (req, res,next) => {
    const { id } = req.params;
    const inventariosPromise =  Inventario.findAll({
        where : {
            idInventario : id
        }
    });
    
   const [inventarios] = await Promise.all([inventariosPromise]).then();
   if(inventarios){
   const categoriaPromise = Categoria.findAll();
    const [categorias] = await Promise.all([categoriaPromise]).then(); 
    res.render('inventario/editarInventario', {inventarios,categorias});   
}else{return next();}
    
    //console.log(inventarios.descripcion);

}
 exports.ModificarInventario=async(req,res)=>{
    //const { id } = req.locals.inventario.idInventario;
    console.log(req.body.categoriainventarioIdCategoria);
    const categoria = await Categoria.findOne({
        where : {
            idCategoria : req.body.categoriainventarioIdCategoria
        }
    });

    const categoriainventarioIdCategoria =  categoria.idCategoria;
    const { id } = req.params;

    //const inventarios = await Inventario.findAll({where:{idInventario:id}});
    const { nombre, descripcion, costoUnitario,precioVenta,stock } = req.body;


    let errores = [];

    // Verificar si el nombre del proyecto tiene un valor
    if (!nombre && !descripcion && !costoUnitario && !precioVenta && !stock && !categoriainventarioIdCategoria ) {
        errores.push({'texto': 'El nombre del proyecto no puede ser vacío.'});
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('inventario/verInventario');
    } else {
        // No existen errores
        // Inserción en la base de datos.
        await Inventario.update(
            { nombre,descripcion,costoUnitario,precioVenta,stock,categoriainventarioIdCategoria},
            { where : {
                idInventario : id
            }}
        );

        // Redirigir hacia la ruta principal
        res.redirect('../../inventario/mostrarInventario');

       
    }
 }