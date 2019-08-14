// Importar el modelo de Usuarios
const Usuario = require('../models/Usuario');
const Client = require('../models/Cliente');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

signToken = user => {
    return JWT.sign({
        iss : 'SuperEnLinea',
        sub : Usuario.id,
        iat : new Date().getTime(),
        exp : new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET);
}

exports.formularioCrearCuenta = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear una cuenta'
    });
    console.log("estas en crear cuenta");
}

exports.crearCuenta = async(req, res, next) => {
    //Obtener datos
    //Capturar valores con destructuring
    const { email, password, Nombre, Apellido, Telefono, Direccion } = req.body;

    //Intentar crear el usuario
    try {
        //Crear el usuario
        console.log(password);
        await Client.create({
            Nombre,
            Apellido,
            Telefono,
            Direccion,
            email
        })
        const clienteId = await Client.findOne({
            
            where: {
                email
            }
        })
        console.log(clienteId);
        await Usuario.create({
            email : email,
            password : password,
            clienteId : clienteId.id
        })
        .then(() => {
            res.redirect('/user/iniciar_sesion');
            console.log("usuario creado")
        })
    } catch (error) {
        console.log(error)
        res.render('crearCuenta', {
            nombrePagina : 'Crear una cuenta',
            mensajes : req.flash(),
            email,
            password
        });
        console.log("No se creo el usuario");
        
    }
}

//
exports.facebookOAuth = async (res, req, next) => {
    // Generar token
    const token = signToken(req.Usuario);
    res.cookie('access_token', token, {
        httpOnly : true
    });
    res.status(200).json({
        success : true
    });
}

// Conectarse a Facebook
exports.linkFacebook = async (req, res, next) => {
    res.json({
        success : true,
        methods : req.Usuario.methods,
        message : 'Conexion a Facebook establecida'
    });
}

// Desconectarse de Facebook
exports.unlinkFacebook = async(req, res, next) => {
    //Borrar objeto de Facebook
    if (req.Usuario.facebook) {
        req.Usuario.facebook = undefined
    }

    //Quitar 'facebook' del array de methods
    const wipeFacebook = req.Usuario.methods.indexOf('facebook')
    if (wipeFacebook >= 0) {
        req.Usuario.methods.splice(wipeFacebook, 1)
    }

    await req.Usuario.save()

    res.json({
        success : true,
        methods : req.Usuario.methods,
        message : 'Ya no esta conectado a Facebook'
    })
}
// exports.googleOAuth = async(res, req, next) => {
//     const token = signToken(req.Usuario);
//     res.status(200).json([ token ]);
// }

exports.formularioIniciarSesion = (req, res) => {
    //Capturar los errores generados por passport
    // const {
    //     error
    // } = res.locals.mensajes;

    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesion'
        // error
    });
    console.log("estas en iniciar sesion")
}

exports.formularioReestablecerPassword = async (req, res) => {
    res.render('solicitudReestablecerPassword', {
        nombrePagina: 'Reestablecer contraseña'
    });
    console.log('estas en reestablecer contraseña');
}