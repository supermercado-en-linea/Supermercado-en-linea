import * as carrito from '../models/carrito';

async function AgregarCarrito(){
    
    // var IdCliente = cliente;
    // var Nombre = nombre;
    // var Precio = precio;
    // var Cantidad = cantidad;
    // var Total = total;
    
    console.log("Holas")
    
    await carrito.create({idCliente: 1, estado: "1", numeroProductos: 1, total: 123});
    
   
}