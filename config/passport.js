//Importar passport
const passport = require('passport');
// Importar estrategias de passport
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;
// const { ExtraerJwt } = require('passport-jwt');

//Referenciar el modelo al que se autentica
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');

// Importar archivo config.js para los clientId y Secret id


// Estrategia JSON Web Tokens
// passport.use(
//     new JwtStrategy ({
//         jwtFromRequest : ExtraerJwt.fromHeader('authorization'),
//         secretOrKey : config.JWT_SECRET
//     }, async (payload, done) => {
//         try {
//             // Buscar Usuario especificado en el token
//             const user = await Usuario.findById(payload.sub);

//             if(!user) {
//                 return done(null, false);
//             }

//             done (null, user);
//         } catch (error) {
//             done(error, false);
//         }
//     })
// )

// Importar archivo config.js para los clientId y Secret id

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
/* passport.use('facebook',
    new FacebookStrategy(
        {
            clientID : config.facebook.clientId,
            clientSecret : config.facebook.clientSecret,
            passReqToCallback : true
        },
        async (accessToken, refreshToken, profile, done) => {
            try
            {
                console.log('profile: ', profile);
                console.log('accessToken: ', accessToken);
                console.log('refreshToken: ', refreshToken);

                if (req.Usuario) {
                    req.Usuario.methods.push('facebook')
                    req.Usuario.facebook = {
                        id : profile.id,
                        email : profile.emails[0].value
                    }
                    await req.Usuario.save();
                    return done(null, req.Usuario);
                } else {
                    let usuarioExistente = await Usuario.findOne({ "facebook.id" : profile.id});
                    if (usuarioExistente) {
                        return done(null, usuarioExistente);
                    }

                    usuarioExistente = await Usuario.findOne({ "local.email" : profile.emails[0].value })
                    if (usuarioExistente) {
                        usuarioExistente.methods.push('facebook')
                        usuarioExistente.facebook = {
                            id : profile.id,
                            email : profile.emails[0].value
                        }
                        await usuarioExistente.save()
                        return done(null, usuarioExistente);
                    }

                    const nuevoUsuario = new Usuario({
                        methods : ['facebook'],
                        facebook : {
                            id : profile.id,
                            email : profile.emails[0].value
                        }
                    });

                    await nuevoUsuario.save();
                    done(null, nuevoUsuario);
                }
            }
            catch (error) {
                done (error, false, error.message);
            }
        }
    )
); */


//Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;