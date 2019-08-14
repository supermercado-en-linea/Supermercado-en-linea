// Importar el modelo
//const Proyecto = require('../models/Proyecto');
const Inventario = require('../models/Inventario');
const Categoria = require('../models/Categoria');



exports.paginaPrincipal =  async(req, res) => {
    res.render('index', {
        nombrePagina : 'Inicio'
    });
};

exports.productos =  async(req, res) => {
    const inventariosPromise = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPromise]).then();
    const categoriasPromise = Categoria.findAll();

    const [categorias] = await Promise.all([categoriasPromise]).then();
   
    res.render('productos',{
      inventarios,
      nombrePagina : 'Productos',
      categorias
    });
};

exports.formulario= async(req,res)=>{
    res.render('formularios');

};

exports.contacto =  async(req, res) => {
    res.render('contactanos',{

        nombrePagina : 'Contáctanos'
    });
};

exports.carrito =  async(req, res) => {
    res.render('carrito',{

        nombrePagina : 'Tu carrito'
    });
};
