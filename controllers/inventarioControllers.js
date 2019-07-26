// Importar los modelos
const Inventario = require('../models/Inventario');
//importar convertidor a pug
const html2pug = require('html2pug')

var markdown = require('marked');

exports.inventariosHome = async (req, res) => {
    // Obtener todos los proyectos
    // const inventario = await inventario.findAll();

    res.render('index');
};

exports.wysiwyg = function(req, res){
    res.render('wysiwyg');
}

exports.ariculosHome2 = async(req, res) =>{
    const inventariosPromise = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPromise]).then();
    
    res.render('verInventarios',{
        inventarios,
        markdown
    });
}
exports.nuevoInventario = async (req, res) => {

    const titulo = req.body.titulo;
    const content = req.body.content;
   
    let errores = [];
    
    if (!titulo && !content ) {
        errores.push({'texto': 'Se encotraron errores'});
    }
   
    if (errores.length > 0) {
        console.log(errores)
        res.render('/crear_inventarios');
    }else{
        let newArticle = new Inventario({
                    nombre:titulo,
                    cuerpo:content
        });

        await Inventario.create({nombre: newArticle.nombre, cuerpo: newArticle.cuerpo});
        res.redirect('/ver_inventarios');
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