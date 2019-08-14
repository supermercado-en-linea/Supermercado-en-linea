// Importar referencias
const Sequelize = require('sequelize');
const db = require('../config/db');
// const Usuario = require('./Usuario');

const Cliente = db.define('cliente', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
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
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: {
            args: true,
            msg: 'Este nombre de usuario ya existe'
        }
    },

 })

// Cliente.hasOne(Usuario);

module.exports = Cliente;