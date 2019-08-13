//Importar passport
const passport = require('passport');
// Importar estrategias de passport
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

//Referenciar el modelo al que se autentica
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');

// Importar archivo config.js para los clientId y Secret id
const config = require('../config/config');

//Definir estrategia de autenticacion local
passport.use(
    new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
        },
        async (email, password, done) => {
            try {
                // Busqueda del usuario
                
                const usuario = await Usuario.findOne({
                    where : { email }
                });
                console.log(email + " " + password);
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message : 'Contraseña incorrecta'
                    });
                }
                return done(null, usuario);
            } catch (error) {
                return done(null, false, {
                    message: 'No existe esta cuenta'
                });
            }
        }
    )
);

// Estrategia de autenticacion de google
// passport.use('google',
//     new GoogleStrategy (
//         {
//             clientId: "630114060982-loh16abu71viflj0b8i8e6730ds9t6aq.apps.googleusercontent.com",
//             clientSecret: "DsKXO5fAOBORFF3dEiwxBkmi"
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 console.log('accessToken: ', accessToken);
//                 console.log('refreshToken: ', refreshToken);
//                 console.log('profile: ', profile);
//             } catch (error) {
//                 done(error, false, error.message);
//             }
//         }
//     )
// )

//Estrategia de autenticacion con Facebook
passport.use('facebook',
    new FacebookStrategy(
        {
            clientID : config.facebook.clientId,
            clientSecret : config.facebook.clientSecret,
        },
        async (accessToken, refreshToken, profile, done) => {
            try
            {
                console.log('profile: ', profile);
                console.log('accessToken: ', accessToken);
                console.log('refreshToken: ', refreshToken);
            }
            catch (error) {
                done (error, false, error.message)
            }
        }
    )
);


//Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;