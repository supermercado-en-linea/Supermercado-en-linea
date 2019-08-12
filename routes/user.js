// Express router
const express = require('express');
const router = express.Router();

// Importar los controllers
const authController = require('../controllers/authController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {
    //Crear cuenta
    router.get('/crear_cuenta', usuariosController.formularioCrearCuenta);
    router.post('/crear_cuenta', usuariosController.crearCuenta);

    // Crear cuenta Google
    // router.post('/auth/facebook/token',
    //     passport.authenticate('facebook-token'),
    //     function (req, res) {
    //         res.send(req.user ? 200 : 401);
    //     }
    // )

    // Iniciar sesión
    router.get('/iniciar_sesion', usuariosController.formularioIniciarSesion);
    router.post('/iniciar_sesion', authController.autenticarUsuario);

    // Cerrar sesión
    router.get('/cerrar_sesion', authController.cerrarSesion);
    return router;
}
