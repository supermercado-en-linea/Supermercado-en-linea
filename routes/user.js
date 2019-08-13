// Express router
const express = require('express');
const router = express.Router();

// Importar passport
const passport = require('passport');

// Importar los controllers
const authController = require('../controllers/authController');
const usuariosController = require('../controllers/usuariosController');

module.exports = function () {
    //Crear cuenta
    router.get('/crear_cuenta', usuariosController.formularioCrearCuenta);
    router.post('/crear_cuenta', usuariosController.crearCuenta);

    // router.post('/crear_cuentaFacebook', authController.autenticarUsuarioFacebook);
    
    // router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    //     successRedirect: '/crear_cuenta',
    //     failureRedirect: '/iniciar_sesion'
    // }));
    // router.get('/auth/facebook', authController.autenticarUsuarioFacebook);

    // Iniciar sesión
    router.get('/iniciar_sesion', usuariosController.formularioIniciarSesion);
    router.post('/iniciar_sesion', authController.autenticarUsuario);

    // router.route('/auth/google')
    //     .post(passport.authenticate('google', { session : false }), authController.autenticarUsuarioGoogle);

    router.route('/auth/facebook')
        .post(passport.authenticate('facebook', { session : false }), authController.autenticarUsuarioFacebook);

    // Cerrar sesión
    router.get('/cerrar_sesion', authController.cerrarSesion);

    // router.get('/auth/facebook/callback', function (req, res) {
    //     req.logout();
    //     res.redirect('/');
// });

    return router;
}
