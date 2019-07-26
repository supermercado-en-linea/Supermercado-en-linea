//express router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importar express-validator
const { body } = require('express-validator');

// Importar el Controller

// TODO: Falta implementar el controlador
const inventarioController = require('../controllers/inventarioController')
const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {

    // Rutas de inventarios
    router.get('/', inventariosController.inventariosHome);
    router.get('/ver_inventarios', inventariosController.ariculosHome2)
    router.get('/crear_inventarios', inventariosController.wysiwyg);
    router.post('/crear_inventario',  body('content').not().isEmpty(), body('titulo').not().isEmpty(),inventariosController.nuevoArticulo);
    router.get('/inventario/:url', inventariosController.inventarioPorUrl);

    return router;
}
