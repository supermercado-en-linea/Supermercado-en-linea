//Importar passport
const passport = require('passport');
// Importar estrategias de passport
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token').Strategy;
const FacebookStrategy = require('passport-facebook-token').Strategy;

//Referenciar el modelo al que se autentica
const Usuario = require('../models/Usuario');

//Definir estrategia de autenticacion local
passport.use(
    new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        async (email, password, done) => {
            try {
                // Busqueda del usuario
                
                const usuario = await Usuario.findOne({
                    where : { email }
                });
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

// function extractProfile (profile) {
//     let imageUrl = '';
//     if (profile.photos && profile.photos.length) {
//         imageUrl = profile.photos[0].value;
//     }
//     return {
//         id : profile.id,
//         displayName : profile.displayName,
//         image : imageUrl
//     };
// }


// Estrategia de autenticacion de google
// passport.use(
//     new GoogleStrategy (
//         {
//             clientId: "630114060982-loh16abu71viflj0b8i8e6730ds9t6aq.apps.googleusercontent.com",
//             clientSecret: "DsKXO5fAOBORFF3dEiwxBkmi"
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             console.log('accessToken: ', accessToken);
//             console.log('refreshToken: ', refreshToken);
//             console.log('profile: ', profile);
//         }
//     )
// )

// passport.use(
//     new FacebookStrategy (
//         {
//             clientID: '2417550305197183',
//             clientSecret: 'e2e0a41be8f47869d8a86d542eaff8c0',
//             fbGrapghVersion : 'v3.0'
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             Usuario.findOrCreate(
//                 {
//                     facebookId : profile.id
//                 },
//                 function (error, user) {
//                     return done (error, user);
//                 }
//             );
//         }
//     )
// );

//Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

// router.get(
//     // Login URL
//     '/auth/login',
//     (req, res, next) => {
//         if (req.query.return) {
//             req.session.oauth2return = req.query.return;
//         }
//         next();
//     },
//     passport.authenticate('google', { scope: ['email', 'profile']})
// );

module.exports = passport;