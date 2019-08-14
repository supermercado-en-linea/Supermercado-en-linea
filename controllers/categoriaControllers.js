// Importar los modelos
const Categoria = require('../models/Categoria');
//const Categoria = require('../models/Categoria');

//importar convertidor a pug
const html2pug = require('html2pug');



exports.categoriasHome = async (req, res) => {
    // Obtener todos los proyectos
    // const categoria = await categoria.findAll(); 
    res.render('categoria/categoria');
}; 


exports.crearCategoria = async (req, res)=>{
    
    res.render('categoria/crearCategoria');
};



exports.categoriaHome2 = async(req, res) =>{
    const categoriasPromise = Categoria.findAll();

    const [categorias] = await Promise.all([categoriasPromise]).then();
    
    res.render('categoria/verCategoria',{categorias});
}

exports.nuevaCategoria = async (req, res) => {

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
 
    //const Categoria = 
   
    let errores = [];
    
    if (!nombre && !descripcion ) {
        errores.push({'texto': 'Se encotraron errores'});
    }
   
    if (errores.length > 0) {
        console.log(errores)
        res.render('categoria/crearCategoria');
    }else{
        let newArticle = new Categoria({
                    nombre:nombre,
                    descripcion:descripcion,
                    
        });

        await Categoria.create({nombre: newArticle.nombre, descripcion: newArticle.descripcion});
        const categoriasPromise = Categoria.findAll();

    const [categorias] = await Promise.all([categoriasPromise]).then();
        res.render('categoria/verCategoria',{categorias});
    }
}

exports.categoriaPorUrl = async (req, res) => {

    const categoriasPromise = Categoria.findOne({
        where : {
            url : req.params.url
        }
    });

    const [categoria] = await Promise.all([categoriasPromise]).then();
    
    res.render('categoria',{
        categoria
    });

}

exports.eliminarCategoria = async (req, res,next) => {
    const { id } = req.params;
    const categoriasPromise = await Categoria.destroy({
        where : {
            idCategoria : id
        }
    });

    if(!categoriasPromise){
        return next();
    }
    console.log('Articulo Eliminado Exitosamente');
    //res.render('categoria/verCategoria');
    const categoriasPro = Categoria.findAll();

    const [categorias] = await Promise.all([categoriasPro]).then();
    res.render('categoria/verCategoria',{categorias});
    
}
exports.editarCategoria = async (req, res) => {
    const { id } = req.params;
    const categoriasPromise =  Categoria.findAll({
        where : {
            idCategoria : id
        }
    });
   const [categorias] = await Promise.all([categoriasPromise]).then();
    res.render('categoria/editarCategoria', {categorias});
    console.log(categorias.descripcion);

}
 exports.ModificarCategoria=async(req,res)=>{
    //const { id } = req.locals.categoria.idCategoria;
    const { id } = req.params;

    //const categorias = await Categoria.findAll({where:{idCategoria:id}});
    const { nombre, descripcion } = req.body;


    let errores = [];

    // Verificar si el nombre del proyecto tiene un valor
    if (!nombre && !descripcion) {
        errores.push({'texto': 'El nombre del proyecto no puede ser vacío.'});
    }

    // Si hay errores
    if (errores.length > 0) {
        res.render('categoria/verCategoria');
    } else {
        // No existen errores
        // Inserción en la base de datos.
        await Categoria.update(
            { nombre ,descripcion},
            { where : {
                idCategoria : id
            }}
        );

        // Redirigir hacia la ruta principal
        res.redirect('../../categoria/verCategoria');

       
    }
 }
