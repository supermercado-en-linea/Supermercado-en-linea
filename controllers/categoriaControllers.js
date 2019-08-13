// Importar los modelos
const Categoria = require('../models/Categoria');
//const Categoria = require('../models/Categoria');

//importar convertidor a pug
const html2pug = require('html2pug')



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
        res.render('categoria/crearCategoria');
    }else{
        let newArticle = new Categoria({
                    nombre:nombre,
                    descripcion:content,
                    costoUnitario:costo,
                    precioVenta: precio,
                    stock: cantidad
        });

        await Categoria.create({nombre: newArticle.nombre, descripcion: newArticle.descripcion, costoUnitario: newArticle.costoUnitario, precioVenta: newArticle.precioVenta,stock:newArticle.stock});
        res.redirect('verCategoria');
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