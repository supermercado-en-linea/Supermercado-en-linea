//express router
const express = require('express');
const router = express.Router();
// Importar express-validator

// Importar el Controller

// TODO: Falta implementar el controlador
const FacturaController = require('../controllers/facturaController')
//const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {
    
    // Rutas de inventarios
    router.get('/agregar_carrito', inventariosController.inventariosHome);
    router.get('/ver_inventarios', inventariosController.ariculosHome2)
    router.get('/crear_inventarios', inventariosController.wysiwyg);
    router.post('/crear_inventario',  body('content').not().isEmpty(), body('titulo').not().isEmpty(),inventariosController.nuevoArticulo);
    router.get('/inventario/:url', inventariosController.inventarioPorUrl);

    return router;
}