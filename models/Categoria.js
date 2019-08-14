// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

// Definición del modelo (Model)
const Categoria = db.define('categoriainventario', {
    idCategoria : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre : {
        type: Sequelize.STRING(30)
    },

    descripcion: {
        type: Sequelize.STRING(50)
    },
   
    url : Sequelize.STRING
}, {
    hooks : {
        beforeCreate(categoria) {
            console.log('Antes de insertar en la base de datos');
            const url = slug(categoria.nombre).toLowerCase();

            categoria.url = `${url}-${shortid.generate()}`;
        },

        beforeUpdate(categoria) {
            console.log('Antes de actualizar en la base de datos');
            const url = slug(categoria.nombre).toLowerCase();

            categoria.url = `${url}-${shortid.generate()}`;
        }
    }
});

// Importar el modelo para poder utilizarlo
module.exports = Categoria;