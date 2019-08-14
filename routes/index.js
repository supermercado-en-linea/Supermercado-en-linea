
const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')



//const pool = require('../database');
//const pool = require('../database');


module.exports = function () {

    router.get('/', indexController.paginaPrincipal);
    
    router.get('/productos/:url', indexController.ver);


    router.get('/productos', indexController.productos);

    router.get('/contactanos', indexController.contacto);
    
    router.get('/formularios',indexController.formulario);
    return router;
}
