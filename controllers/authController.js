// Importar passport
const passport = require('passport');
// Importar el modelo de Usuario
const Usuario = require('../models/Usuario');
// Importar Sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Importar bcrypt
const bcrypt = require('bcrypt');
// Importar crypto
const crypto = require('crypto');
// Importar enviar correos
const enviarEmail = require('../handlers/email');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/user/iniciar_sesion',
    failureFlash : true,
    badRequestMessage : 'Debes ingresar tu correo electronico y tu contraseña.'
});

// exports.autenticarUsuarioFacebook = router.get('/auth/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/user/iniciar_sesion',
//     failureFlash: true,
//     badRequestMessage: 'Debes ingresar tu correo electronico y tu contraseña.'
// }));

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
    return res.redirect('/user/iniciar_sesion');
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
        res.redirect('/user/reestablecer');
    }

    // Generar token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;

    // Guardar token en la BD
    await usuario.save();

    // URL de reset
    const resetURL = `http://${req.headers.host}/user/reestablecer/${usuario.token}`;

    await enviarEmail.enviarEmail({
        usuario,
        subject: 'Recupera tu contraseña en SuperEnLinea',
        resetURL,
        view : 'reestablecerPassword'
    })

    req.flash('Enviado', 'Se envio un enlace a tu correo para reestablecer tu contraseña')
    res.redirect('/user/iniciar_sesion');
}

// Validar el token
exports.validarToken = async (req, res) => {
    // Buscar el usuario perteneciente del token
    const usuario = await Usuario.findOne({
        where : {
            token : req.params.token
        }
    });

    if (!usuario) {
        req.flash('Error', 'El enlace que seguiste no es valido');
        res.redirect('/user/reestablecer');
    }

    // Si existe el usuario, mostrar formulario para cambiar contraseña
    res.render('cambiarPassword', {
        nombrePagina: 'Cambiar contraseña',
        tkn: req.params.token
    });
}

// Cambiar contraseña del usuario
exports.updatePassword = async (req, res) => {
    console.log('estas es cambiar contrasena');
    console.log(req.params.token);
    // Obtener usuario por medio del token y verificar expiracion del token
    const usuario = await Usuario.findOne({
        where : {
            token : req.params.token
        }
    });
    console.log(usuario);
    // Verificar si hay modelo de usuario
    if (!usuario) {
        req.flash('Error', 'Token no es valido o esta vencido. Intenta de nuevo');
        res.redirect('/user/reestablecer');
    }

    // El token es valido y aun esta vigente
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // Limpiar valores del token y fecha de expiracion
    usuario.token = null;
    usuario.expiration = null;

    console.log(usuario.password);

    // Se guarda los datos en la BD
    await usuario.update(
        { password : usuario.password,
          token : usuario.token,
          expiration : usuario.expiration},
        { where : {
            email : req.body.email
        }},
        console.log('password changed')
    );
    
    // Se redirecciona al inicio de sesion
    req.flash('Hecho', 'La contraseña se ha modificado exitosamente');
    res.redirect('/user/iniciar_sesion');
}
