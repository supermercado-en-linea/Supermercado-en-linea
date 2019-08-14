// Importar los módulos de express
const express = require('express');
// Importar las rutas disponibles
//const routes = require('./routes');
let userRoutes = require('./routes/user');
let carritoRoutes = require('./routes/carrito');
// Importar los módulos para direcciones (path)
const path = require('path');
// Importar los módulos para utilizar body parser
const bodyParser = require('body-parser');
// Importar los módulos para utilizar passport
const passport = require('./config/passport')

const session = require("express-session")

var SequelizeStore = require("connect-session-sequelize")(session.Store);

const flash = require("connect-flash");
const facturaRoute = require("./routes/factura")


// Crear la conexión con la Base de Datos
const db = require('./config/db');

// Importar modelos
require('./models/Usuario');
require('./models/Cliente');
require('./models/carrito');
require('./models/productoCarrito');
// Realizar la conexión
// Sequelize se conecta mediante promises
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Promise
db.sync()
    .then(() => console.log('Conectado al servidor de BD'))
    .catch(error => console.log(error));

// Crear una App de express
const app = express();

// Importar los modelos


// Desde dónde se cargan los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug como nuestro Template Engine
app.set('view engine', 'pug');

// Habilitar BodyParser para leer los datos de los formularios
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar sesiones
app.use(session({
    secret : 'unpijesecreto',
    resave : false,
    saveUninitialized : false,
    store: new SequelizeStore({db: db}),
    cookie : { maxAge: 180 * 60 * 1000}
}))

//Crear una instancia de passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

// Añadir la carpeta (ruta) que contiene las View (vistas)
app.set('views', path.join(__dirname, './views'));

const indexRoute = require('./routes/index')
app.use('/factura', facturaRoute());
app.use('/user', userRoutes());
app.use('/carrito', carritoRoutes());
app.use('/', indexRoute());

//app.use('/', routes());
let inventarioRoutes = require('./routes/inventario');
app.use('/formularios/inventario', inventarioRoutes());

let categoriaRoutes = require('./routes/categoria');
app.use('/formularios/categoria', categoriaRoutes());
// Inicializar el servidor de express en un puerto
app.listen(9999);