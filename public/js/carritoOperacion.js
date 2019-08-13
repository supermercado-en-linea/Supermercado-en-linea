const CarritoControlador = require("../../controllers/carritoControllers");

function AgregarCarrito(cliente,nombre,precio,cantidad,total) {
    
    var IdCliente = cliente;
    var Nombre = nombre;
    var Precio = precio;
    var Cantidad = cantidad;
    var Total = total;
    
    
    CarritoControlador.crearCarrito(IdCliente,Nombre,Precio,Cantidad,Total);
   console.log(IdCliente, Nombre,Precio)
}