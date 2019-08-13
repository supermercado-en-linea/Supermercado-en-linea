//express router
const express = require('express');
const router = express.Router();
// Importar express-validator

// Importar el Controller

// TODO: Falta implementar el controlador
const carritosController = require('../controllers/carritoController');
//const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {
    
    // Rutas de carritos
    router.post('/crearCarrito', carritosController.crearCarrito);
    router.get('/ver_carritos', carritosController.ariculosHome2);
   // router.post('/crear_carrito', carritosController.nuevoArticulo);
    router.get('/carrito/:url', carritosController.carritoPorUrl);

    return router;
}