// Importar sequelize
const Sequelize = require('sequelize');

// Establecer los parámetros de conexión a la Base de Datos
const db = new Sequelize('SuperEnLinea', 'NegociosWeb2019', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorAliases: false,

    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;