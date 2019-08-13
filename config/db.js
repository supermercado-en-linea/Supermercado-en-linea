// Importar Sequilize
const Sequilize = require('sequelize');

// Establecer los paremetros de la base de datos
const db = new Sequilize('SuperEnLinea', 'root', '', {

    host: 'localhost',
    dialect: 'mysql',
    pool: '3306',
    operatorsAliases: false,

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