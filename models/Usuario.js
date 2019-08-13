// Importar referencias
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const Cliente = require('../models/Cliente');

// Definicion del model Usuario
const Usuario = db.define('Usuario', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : Sequelize.STRING(100),
        allowNull : false,
        // validate : {
        //     isEmail : {
        //         msg : "Ingrese un correo electronico valido"
        //     },
        //     notEmpty : {
        //         msg : "Porfavor ingrese un correo electronico valido"
        //     }
        // },
        unique : {
            args : true,
            msg: 'Este nombre de usuario ya existe'
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : true
        // validate: {
        //     notEmpty: {
        //         msg: 'Ingresa una contraseña porfavor'
        //     }
        // }
    },
    provider_id : {
        type : Sequelize.STRING(100),
        unique : true
    }
},
{
    hooks : {
        beforeCreate(Usuario) {
            //Generar hash de password
            Usuario.password = bcrypt.hashSync(Usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

// Usuario.hasOne(Cliente);

Usuario.prototype.verificarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Usuario;