//express router
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importar express-validator
const { body } = require('express-validator');

// Importar el Controller

// TODO: Falta implementar el controlador
const categoriasController = require('../controllers/categoriaControllers');
//const userController = require('../controllers/userController')


// importar el modelo de usuario
//let Usuario = require('../models/user');

// forma de registro


module.exports = function () {
    
    // Rutas de categorias
    router.get('/', categoriasController.categoriasHome);
    router.get('/verCategoria', categoriasController.categoriaHome2);
    router.get('/crearCategoria', categoriasController.crearCategoria);
    router.post('/crearCategoria',  categoriasController.nuevaCategoria);
    router.get('/editarCategoria/:id',categoriasController.editarCategoria);
    router.post('/editarCategoria/:id',categoriasController.ModificarCategoria);
    router.get('/eliminarCategoria/:id',categoriasController.eliminarCategoria);
    //router.get('/categoria/:url', categoriasController.categoriaPorUrl);

    return router;
}
