// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');
const Categoria = require('./Categoria');


// Definición del modelo (Model)
const Inventario = db.define('inventario', {
    idInventario : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre : {
        type: Sequelize.STRING(30)
    },

    descripcion : {
        type: Sequelize.STRING(100)
    },
    costoUnitario :{
        type: Sequelize.DECIMAL(5,2)
    },
    precioVenta :{
        type: Sequelize.DECIMAL(5,2)
    },
    stock :{
        type: Sequelize.DECIMAL(5,2)
    },foto: {
        type: Sequelize.STRING
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

Inventario.belongsTo(Categoria);


// Importar el modelo para poder utilizarlo
module.exports = Inventario;