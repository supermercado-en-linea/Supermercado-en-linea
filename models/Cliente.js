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
        allowNull: false,
        validate : {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    },
    Direccion : {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate : {
            notEmpty: {
                msg: 'Porfavor introduzca un correo electronico!'
            }
        }
    },
    Email : {
        type: Sequelize.STRING(15),
        allowNull: false,
        validate : {
            isEmail : {
                msg: 'El correo no es valido'
            },
            notEmpty : {
                msg : 'Porfavor introduzca un correo electronico!'
            }
        },
        unique : {
            args : true,
            msg : 'Ya existe una cuenta con este correo electronico'
        }
    }
})