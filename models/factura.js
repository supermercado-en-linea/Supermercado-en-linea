// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

const Cliente = require('./Cliente');

const Factura = db.define('factura', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subTotal : {
        type: Sequelize.FLOAT
    },
    isv : {
        type: Sequelize.FLOAT
    },
    estado: {
        type: Sequelize.INTEGER
    },
    total : {
        type: Sequelize.FLOAT
    },
    fecha : {
        type: Sequelize.DATE(6),
        defaultValue: Sequelize.NOW
    },
    url : Sequelize.STRING
}, {
    hooks : {
        beforeCreate(Factura) {
            console.log('Antes de insertar en la base de datos');
            Factura.url = `${shortid.generate()}`;
        },

        beforeUpdate(Factura) {
            console.log('Antes de actualizar en la base de datos');
            Factura.url = `${shortid.generate()}`;
        }
    }
});

Factura.belongsTo(Cliente);

// Importar el modelo para poder utilizarlo
module.exports = Factura;