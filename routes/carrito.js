//express router
const express = require('express');
const router = express.Router();
// Importar express-validator

// Importar el Controller

const carritosController = require('../controllers/carritoController');
//const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {
    // Rutas de carritos
    router.get('/anadir_carrito/:id', carritosController.crearCarrito);

    return router;
}
