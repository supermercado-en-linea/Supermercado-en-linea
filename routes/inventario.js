//express router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importar express-validator
const { body } = require('express-validator');

// Importar el Controller

// TODO: Falta implementar el controlador
const inventariosController = require('../controllers/inventarioControllers');
//const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {
    
    // Rutas de inventarios
    router.get('/', inventariosController.inventariosHome);
    
    router.get('/mostrarInventario', inventariosController.inventarioHome2);
    router.get('/crearInventario', inventariosController.crearInventario);
    router.get('/carrito',inventariosController.carrito);
    router.post('/crearInventario',  body('content').not().isEmpty(), body('nombre').not().isEmpty(),inventariosController.nuevoInventario);
    router.get('/editarInventario/:id',inventariosController.editarInventario);
    router.post('/editarInventario/:id',inventariosController.ModificarInventario);
    router.get('/eliminarInventario/:id',inventariosController.eliminarInventario);
    router.get('/filtro/:url',inventariosController.ver);
    //router.get('/inventario/:url', inventariosController.inventarioPorUrl);

    return router;
}
