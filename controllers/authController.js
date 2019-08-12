// Importar passport
const passport = require('passport');
// Importar el modelo de Usuario
const Usuario = require('../models/Usuario');
// Importar Sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Importar bcrypt
const bcrypt = require('bcrypt');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/user/crear_cuenta',
    failureRedirect : '/user/iniciar_sesion',
    failureFlash : true,
    badRequestMessage : 'Debes ingresar tu correo electronico y tu contraseña.'
});

exports.cerrarSesion = (req, res) => {
    //Al cerrar sesion el usuario deberia ser redirigido al inicio de sesion
    req.session.destroy(() => {
        res.redirect('/');
    })
};

exports.usuarioAutenticado = (req, res, next) => {
    //Si el usuario esta autenticado que continue.
    if (req.isAuthenticated()) {
        return next();
    }
    //Si no esta autenticado que inicie sesion
    return res.redirect('/views/iniciarSesion.pug');
}

// Generar token si el usuario es valido
exports.enviarToken = async (req, res) => {
    //Verificar si el usuario existe
    const { email } = req.body;
    const usuario = await Usuario.findOne({
        where : {
            email
        }
    });

    if (!usuario) {
        req.flash('error', 'El correo electronico no es valido');
        res.redirect('/reestablecer');
    }

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    await usuario.save();

}