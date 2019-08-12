// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

const Carrito = require('./carrito')

const ProductoCarrito = db.define('productoCarrito', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre : {
        type: Sequelize.STRING
    },
    precio :{
        type: Sequelize.INTEGER
    },
    cantidad :{
        type: Sequelize.INTEGER
    },
    total :{
        type: Sequelize.INTEGER
    } 
});
ProductoCarrito.belongsTo(Carrito);

// Exportar el modelo
module.exports = ProductoCarrito;