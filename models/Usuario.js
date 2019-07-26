// Importar referencias
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');

// Definicion del model Usuario
const Usuario = db.define('Usuario', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    Usuario : {
        type : Sequelize.STRING(100),
        allowNull : false,
        unique : {
            args : true,
            msg: 'Este nombre de usuario ya existe'
        }
    },
    Password : {
        type : Sequelize.STRING(50),
        allowNull : false,
        validate: {
            notEmpty: {
                msg: 'Ingresa una contraseña porfavor'
            }
        }
    }
},
{
    hooks : {
        beforeCreate(Usuario) {
            Usuario.Password = bcrypt.hashSync(Usuario.Password, bcrypt.genSaltSync(10));
        }
    }
})

module.exports = Usuario;