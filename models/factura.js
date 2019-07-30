// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

const Factura = db.define('factura', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subTotal : {
        type: Sequelize.STRING(8000)
    },
    descuento : {
        type: Sequelize.STRING(8000)
    },
    isv : {
        type: Sequelize.STRING(8000)
    },
    total : {
        type: Sequelize.STRING(8000)
    },
    fecha : {
        type: Sequelize.STRING(8000)
    },
    url : Sequelize.STRING
}, {
    hooks : {
        beforeCreate(inventario) {
            console.log('Antes de insertar en la base de datos');
            const url = slug(inventario.nombre).toLowerCase();

            inventario.url = `${url}-${shortid.generate()}`;
        },

        beforeUpdate(inventario) {
            console.log('Antes de actualizar en la base de datos');
            const url = slug(inventario.nombre).toLowerCase();

            inventario.url = `${url}-${shortid.generate()}`;
        }
    }
});

// Importar el modelo para poder utilizarlo
module.exports = Inventario;