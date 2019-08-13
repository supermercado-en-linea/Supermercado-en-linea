
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')



//const pool = require('../database');
//const pool = require('../database');

router.get('/', async (req, res) => {
    //res.send('Hola mundo');
   
    res.render('inventario/inventario');
   //res.render('inventario/crearInventario');
});

module.exports = function () {

    router.get('/', indexController.paginaPrincipal);

    router.get('/productos', indexController.productos);
    
    
    return router;
}

module.exports = router;
