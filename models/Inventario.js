// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

// Definición del modelo (Model)
const Inventario = db.define('inventario', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre : {
        type: Sequelize.STRING(200)
    },

    cuerpo : {
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