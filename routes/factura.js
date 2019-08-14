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
    router.get('/', FacturaController.nuevaFactura);
    router.get('/generar', FacturaController.generarFactura);
   
    return router;
}
