// Importar el modelo de Usuarios
const Usuario = require('../models/Usuario');

exports.formularioCrearCuenta = async (req, res) => {
    res.render('crearCuenta', {
        nombrePagina : 'Crear una cuenta'
    });
    console.log("estas en crear cuenta")
}

exports.crearCuenta = async(req, res, next) => {
    //Obtener datos
    //Capturar valores con destructuring
    const { email, password } = req.body;

    //Intentar crear el usuario
    try {
        //Crear el usuario
        console.log(password);
        await Usuario.create({
            email,
            password
        })
        .then(() => {
            res.redirect('/user/iniciar_sesion');
            console.log("usuario creado")
            
        })
    } catch (error) {
        req.flash('error' + error.errors);
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

exports.facebookOAuth = async (res, req, next) => {
    console.log('Estas aqui en usuariosController');
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
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer contraseña'
    });
}