// Importar nodemailer
const nodemailer = require('nodemailer');
// Importar pug
const pug = require('pug');
// Importar juice
const juice = require('juice');
// Importar html-to-text
const htmlToText = require('html-to-text');
// Importar Mailtrap
const mailTrapConfig = require('../config/email');
// Importar carpeta de vistas

// Enviar email
exports.enviarEmail = async (opciones) => {
    // Crear transportador
    let transportador = nodemailer.createTransport({
        host : mailTrapConfig.host,
        port : mailTrapConfig.port,
        secure : false,
        auth : {
            user : mailTrapConfig.user,
            pass : mailTrapConfig.pass
        }
    });

    // Generar html
    const generarHTML = (view, opciones = {}) => {
        const html = pug.renderFile(`${__dirname}/../views/emails/${view}.pug`, opciones);
        return juice(html);
    }

    const html = generarHTML(opciones.view, opciones);
    // const text = htmlToText(html);

    let info = await transportador.sendMail({
        from : 'Super En Linea <no-reply@superenlinea.com>',
        to : opciones.usuario.email,
        subject : opciones.subject,
        text : '',
        html
    })
}