// Importar sequelize
const Sequelize = require('sequelize');
// Importar la configuración de la conexión con la BD
const db = require('../config/db');
// Importar slug
const slug = require('slug');
// Importar shortid
const shortid = require('shortid');

const Factura = require('./factura')

const detalleFactura = db.define('detalleFactura', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad : {
        type: Sequelize.STRING
    },
    nombre :{
        type: Sequelize.STRING
    },
    precioUnitario :{
        type: Sequelize.INTEGER
    },
    total :{
        type: Sequelize.INTEGER
    } 
});
detalleFactura.belongsTo(Factura);

// Exportar el modelo
module.exports = detalleFactura;