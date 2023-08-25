function calcular() {
    let carrito = [];

while (true) {
    let producto = parseInt(prompt("Selecciona los items que deseas agregar al carrito por su código, para finalizar ingresa 5"));

    if (producto === 5) {
        break;
    } else if (producto >= 1 && producto <= 4) {
        let cantidad = parseInt(prompt("¿Cuántos deseas comprar?"));
        let totalProducto;

        if (producto === 1) {
            totalProducto = 5000 * cantidad;
        } else if (producto === 2) {
            totalProducto = 3500 * cantidad;
        } else if (producto === 3) {
            totalProducto = 2500 * cantidad;
        } else if (producto === 4) {
            totalProducto = 5000 * cantidad;
        } else {
            alert("Código incorrecto");
            continue;
        }

        carrito.push({ producto, cantidad, total: totalProducto }); 
    } else {
        alert("Código incorrecto");
    }
}

let totalCompra = 0;
for (let i = 0; i < carrito.length; i++) {
    totalCompra += carrito[i].total;
}

alert("Detalle de la compra:");
for (let i = 0; i < carrito.length; i++) {
    alert(`Producto ${carrito[i].producto}: Cantidad ${carrito[i].cantidad}, Total $${carrito[i].total}`);
}
alert(`Total de la compra: $${totalCompra}`);
}