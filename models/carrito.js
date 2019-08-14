// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

const Cliente = require('./Cliente')

const Carrito = db.define('carrito', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCliente : {
        type: Sequelize.INTEGER
    },
    estado : {
        type: Sequelize.STRING
    },
    numeroProductos : {
        type: Sequelize.INTEGER
    },
    total : {
        type: Sequelize.STRING(8000)
    },
    url : Sequelize.STRING
}, {
    hooks : {
        beforeCreate(Carrito) {
            console.log('Antes de insertar en la base de datos');
            const url = slug(Carrito.nombre).toLowerCase();

            inventario.url = `${url}-${shortid.generate()}`;
        },

        beforeUpdate(Carrito) {
            console.log('Antes de actualizar en la base de datos');
            const url = slug(Carrito.nombre).toLowerCase();

            Carrito.url = `${url}-${shortid.generate()}`;
        }
    }
});

Carrito.belongsTo(Cliente);

// Importar el modelo para poder utilizarlo
module.exports = Carrito;