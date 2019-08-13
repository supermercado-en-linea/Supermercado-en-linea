'use strict';
var models = require('../models/index');
var Categoria = models.marca;
var uuidv4 = require('uuid/v4');

class CategoriaController {
    cargarVista(req, res) {
        Categoria.findAll().then(listaCategoria => {
            if (listaCategoria) {
                res.render('administrador', {titulo: 'Vinos Maria | Categorias', fragmento: 'fragments/frm_marca',
                    listaCategoria: listaCategoria});
            } else {
                console.log(listaCategoria.errors);
            }
        });
    }

    guardar(req, res) {
        Categoria.findOne({where: {nombre: req.body.nombreCategoria}}).then(marca => {
            if (marca) {
                req.flash('info', 'La marca ya está ingresada.', false);
                res.redirect('/administracion/marca');
            } else {
                var modeloCategoria = {
                    nombre: req.body.nombreCategoria,
                    external_id: uuidv4()
                };
                Categoria.create(modeloCategoria).then(newCategoria => {
                    if (!newCategoria) {
                        req.flash('info', 'Ocurrió un error al registrar la marca.', false);
                    } else if (newCategoria) {
                        req.flash('info', 'Se registró la marca con éxito.', false);
                    }
                    res.redirect('/administracion/marca');
                });
            }
        });
    }

    modificar(req, res) {
        var modeloCategoria = {
            nombre: req.body.nombreCategoria,
            estado: req.body.estado
        };
        Categoria.update(modeloCategoria, {where: {external_id: req.body.external}}).then(newCategoria => {
            if (newCategoria == 0) {
                req.flash('info', 'No se ha realizado ninguna Modificación.', false);
            } else {
                req.flash('info', 'Se modificó la marca con éxito.', false);
            }
            res.redirect('/administracion/marca');
        });
    }
}

module.exports = CategoriaController;