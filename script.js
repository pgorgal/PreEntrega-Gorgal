// Productos

let etiquetas = [
    { id: 1, nombre: "Plato chico", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x25", signo: "$", precio: 3000 },
    { id: 2, nombre: "Plato grande", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x35", signo: "$", precio: 4000 },
    { id: 3, nombre: "Tabla de asado", descripcion: "Tabla de asado", material: "Guayubira", medidas: "35x50", signo: "$", precio: 5000 },
    { id: 4, nombre: "Tabla pizzera", descripcion: "Tabla para pizza", material: "Guayubira", medidas: "37", signo: "$", precio: 5000 },
    { id: 5, nombre: "Plato chico", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x25", signo: "$", precio: 4000 },
    { id: 6, nombre: "Plato grande", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x35", signo: "$", precio: 5000 },
]

// Simulador Carrito v.1.0

principal(etiquetas)

function principal(etiquetas) {
    let carrito = []

    let opcion
    do {
        opcion = Number(prompt("Ingrese opción:\n1 - Listar productos\n2 - Ver información de un producto\n3 - Filtrar por material\n4 - Ordenar por nombre a-z\n5 - Ordenar por nombre z-a\n6 - Ordenar por precio a-z\n7 - Ordenar por precio z-a\n8 - Agregar producto al carrito\n9 - Finalizar compra\n0 - para salir"))
        switch (opcion) {
            case 1:
                alert(listar(etiquetas))
                break
            case 2:
                buscarProducto(etiquetas)
                break
            case 3:
                buscarPorMaterial(etiquetas)
                break
            case 4:
                etiquetas.sort((a, b) => a.nombre.localeCompare(b.nombre))
                alert(listar(etiquetas))
                break
            case 5:
                etiquetas.sort((a, b) => b.nombre.localeCompare(a.nombre))
                alert(listar(etiquetas))
                break
            case 6:
                etiquetas.sort((a, b) => a.precio - (b.precio))
                alert(listar(etiquetas))
                break
            case 7:
                etiquetas.sort((a, b) => b.precio - (a.precio))
                alert(listar(etiquetas))
                break
            case 8:
                agregarProductoAlCarrito(etiquetas, carrito)
                break
            case 9:
                finalizarCompra(carrito)
                carrito = []
                break
            default:
                break
        }
    } while (opcion != 0)
}

function listar(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + " - Material: " + producto.material + " - $" + producto.precio).join("\n")
}

function descripcion(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + "\n" + producto.descripcion + "\n" + "Material: " + producto.material + "\n" + "Medidas: " + producto.medidas + "cm\n" + "Precio: $" + producto.precio).join("\n")
}

function buscarProducto(productos, carrito) {
    let productoElegido = false

    do {
        let nombreProducto = Number(prompt("Ingresá el ID del producto"))
        let productoBuscado = productos.find(etiqueta => etiqueta.id === nombreProducto)

        if (productoBuscado) {
            alert(descripcion([productoBuscado]))
            productoElegido = true
        } else {
            alert("Producto incorrecto o inexistente")
            alert("Productos disponibles:\n" + listar(productos))
        }
    } while (!productoElegido)
}

function buscarPorMaterial(productos) {
    let materialElegido = false

    do {
        let filtroMaterial = prompt("Ingresá el material").toLowerCase()
        let materialBuscado = productos.filter(etiqueta => etiqueta.material.toLowerCase() === filtroMaterial)

        if (materialBuscado.length > 0) {
            alert(listar(materialBuscado))
            materialElegido = true
        } else {
            alert("Material incorrecto o inexistente")
            alert("Materiales disponibles:\n" + listarMaterialesUnicos(productos))
        }
    } while (!materialElegido)
}

function listarMaterialesUnicos(productos) {
    let materialesUnicos = [...new Set(productos.map(item => item.material))]
    return materialesUnicos.join("\n")
}

function agregarProductoAlCarrito(productos, carrito) {
    let continuarAgregando = true

    while (continuarAgregando) {
        let id = Number(prompt("Seleccione producto por id:\n" + listar(productos)))
        let cantidad = parseInt(prompt("¿Cuántos querés comprar?"))
        let productoBuscado = productos.find(producto => producto.id === id)

        if (productoBuscado) {
            let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)

            if (productoBuscado) {
                if (productoEnCarrito) {
                    productoEnCarrito.unidades += cantidad
                    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
                } else {
                    carrito.push({
                        id: productoBuscado.id,
                        nombre: productoBuscado.nombre,
                        precioUnitario: productoBuscado.precio,
                        unidades: cantidad,
                        subtotal: productoBuscado.precio * cantidad
                    })
                }
                alert("Se agregó producto al carrito")
            }
        } else {
            alert("Seleccione un producto válido")
        }
        let respuesta = prompt("¿Desea agregar más productos al carrito? (Sí/No)").toLowerCase();
        continuarAgregando = respuesta === "si" || respuesta === "sí";
    }
}

function finalizarCompra(carrito) {
    if (carrito.length === 0) {
        alert("Primero debe agregar productos al carrito")
    } else {
        let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
        alert("El total a pagar es " + total)
        alert("Gracias por su compra")
    }
}

//Función crear etiquetas

function crear() {

    function Etiqueta(id, nombre, descripcion, material, medidas, signo, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.material = material;
        this.medidas = medidas;
        this.signo = signo;
        this.precio = parseInt(precio);
        this.valor = this.signo + this.precio;
    }

    let cantidad = Number(prompt("Cantidad"));

    for (let i = 0; i < cantidad; i++) {
        let id = etiquetas.length + 1;
        let nombre = prompt("Ingresar nombre");
        let descripcion = prompt("Ingresar descripción");
        let material = prompt("Ingresar material");
        let medidas = prompt("Ingresar medidas");
        let signo = "$";
        let precio = prompt("Ingresar precio");

        let etiqueta = new Etiqueta(id, nombre, descripcion, material, medidas, signo, precio);
        etiquetas.push(etiqueta);
    }
}

//Función eliminar etiquetas

function borrar() {

    function eliminarEtiqueta(nombre) {
        let indice = etiquetas.findIndex(etiqueta => etiqueta.nombre === nombre);

        if (indice !== -1) {
            etiquetas.splice(indice, 1);
            console.log(`Etiqueta con nombre "${nombre}" eliminado correctamente.`);
        } else {
            console.log(`No se encontró ninguna etiqueta con nombre "${nombre}".`);
        }
    }

    let nombreAEliminar = prompt("Etiqueta a eliminar");
    eliminarEtiqueta(nombreAEliminar);
}

// Ver etiquetas

etiquetas.forEach((item) => {
    console.log(item.id)
    console.log(item.nombre)
    console.log("Confeccionado en " + item.material)
    console.log("Medidas: " + item.medidas + "cm")
    console.log("Precio: $" + item.precio)
})