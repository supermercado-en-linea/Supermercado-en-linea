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
        res.send('hola');
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

exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulos WHERE idArticulo = ?', [id]);
    req.flash('success', 'Articulo Eliminado Exitosamente');
    res.redirect('/articles');
}
exports.editarCategoria = async (req, res) => {
    const { id } = req.params;
    const articles2 = await pool.query('SELECT * FROM articulos WHERE idArticulo = ?', [id]);
    console.log(articles2);
    res.render('articles/edit', {articles: articles2[0]});
}
 exports.ModificarCategoria=async(req,res)=>{
    const { id } = req.params;
    const { titulo, articuloEscrito } = req.body;
    const newLink = {
        titulo, 
        articuloEscrito
        
    };
    await pool.query('UPDATE articulos set ? WHERE idArticulo = ?', [newLink, id]);
    req.flash('success', 'Articulo Guardado Exitosamente');
    res.redirect('/articles');
 }
/* router.get('/', isLoggedIn,async (req, res) => {
    
    const articles = await pool.query('SELECT * FROM articulos WHERE idUsuario = ?', [req.user.id]);
    res.render('articles/list', { articles});

}); */
