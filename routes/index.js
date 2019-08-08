//express router
const express = require('express');
const router = express.Router();

// Importar el Controller

// TODO: Falta implementar el controlador
const indexController = require('../controllers/indexController')
module.exports = function () {

    router.get('/', indexController.paginaPrincipal);
    
    return router;
}