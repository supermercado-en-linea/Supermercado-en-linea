// Importar referencias
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/db');

// Definicion del model Usuario
const Usuario = db.define('Usuario', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    Nombre : {
        type : Sequelize.STRING(100),
        allowNull : false,
        unique : {
            args : true
        }
    },
    Password : {
        type : Sequelize.STRING(50),
        allowNull : false
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