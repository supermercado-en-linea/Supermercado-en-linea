// Importar el modelo
//const Proyecto = require('../models/Proyecto');

exports.paginaPrincipal =  async(req, res) => {
    res.render('index', {
        nombrePagina : 'Inicio'
    });
};

exports.productos =  async(req, res) => {
    res.render('productos',{

        nombrePagina : 'Productos'
    });
};

exports.contacto =  async(req, res) => {
    res.render('contactanos',{

        nombrePagina : 'Contáctanos'
    });
};