function calcular() {
    while (true) {
        let producto = Number(prompt("Seleccioná los items que querés agregar al carrito por su código, para finalizar ingresá 5"))

        if (producto === 5) {
            alert("Muchas gracias!");
            break;
        } else if (producto >= 1 && producto <= 4) {
            let cantidad = Number(prompt("Cuántos querés comprar?"));

            if (producto === 1) {
                alert("El total es $" + 5000 * cantidad);
            } else if (producto === 2) {
                alert("El total es $" + 3500 * cantidad);
            } else if (producto === 3) {
                alert("El total es $" + 2500 * cantidad);
            } else if (producto === 4) {
                alert("El total es $" + 5000 * cantidad);
            } else {
                alert("Código incorrecto");
            }
        } else {
            alert("Código incorrecto");
        }
    }
}