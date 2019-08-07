'use strict';
var models = require('../models/index');
var Vino = models.vino;
var Marca = models.marca;

class CarritoController {
    agregarItem(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.external;
        Vino.findOne({ where: { external_id: external }, include: [{ model: Marca }] }).then(function (vino) {
            if (vino) {
                var pos = CarritoController.verificar(carrito, external);
                if (pos == -1) {
                    var datos = {
                        id: vino.id,
                        external: external,
                        nombre: vino.nombre,
                        cantidad: 1,
                        precio: vino.precio,
                        precio_total: vino.precio,
                        marca: vino.marca.nombre
                    };
                    carrito.push(datos);
                } else {
                    var dato = carrito[pos];
                    dato.cantidad = dato.cantidad + 1;
                    dato.precio_total = dato.cantidad * dato.precio;
                    carrito[pos] = dato;
                }
                req.session.carrito = carrito;
                console.log(req.session.carrito);
                res.status(200).json(req.session.carrito);
            }
        });
    }

    quitarItem(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.external;
        var pos = CarritoController.verificar(carrito, external);
        var dato = carrito[pos];
        if (dato.cantidad > 1) {
            dato.cantidad = dato.cantidad - 1;
            dato.precio_total = dato.cantidad * dato.precio;
            carrito[pos] = dato;
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        } else {
            var aux = [];
            for (var i = 0; i < carrito.length; i++) {
                var items = carrito[i];
                if (items.external != external) {
                    aux.push(items);
                }
            }
            req.session.carrito = aux;
            res.status(200).json(req.session.carrito);
        }

    }

    mostrarCarrito(req, res) {
        res.status(200).json(req.session.carrito);
    }

    static verificar(lista, external) {
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].external == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }
}

module.exports = CarritoController;