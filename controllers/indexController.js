// Importar el modelo
//const Proyecto = require('../models/Proyecto');
const Inventario = require('../models/Inventario');


exports.paginaPrincipal =  async(req, res) => {
    res.render('index');
};


exports.productos =  async(req, res) => {
    const inventariosPromise = Inventario.findAll();

    const [inventarios] = await Promise.all([inventariosPromise]).then();
   
    res.render('productos',{inventarios});
    


};
