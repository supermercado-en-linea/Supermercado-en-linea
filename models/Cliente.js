// Importar referencias
const Sequelize = require('sequelize');
const db = require('../config/db');

const Cliente = db.define('Cliente', {
    id : {
        type : Sequelize.STRING(15),
        primaryKey : true
    },
    Nombre : {
        type : Sequelize.STRING(100),
        allowNull : false,
        validate: {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    },
    Apellido : {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate : {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    },
    Telefono : {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate : {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    },
    Direccion : {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate : {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    }
})