// Importar el modelo
//const Proyecto = require('../models/Proyecto');

exports.paginaPrincipal =  async(req, res) => {
    res.render('index');
};


exports.productos =  async(req, res) => {
    res.render('productos');
};
