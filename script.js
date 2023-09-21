// Productos

let etiquetas = [
    { id: 1, nombre: "Plato chico", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x25", signo: "$", precio: 3000, img: "plato" },
    { id: 2, nombre: "Plato grande", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x35", signo: "$", precio: 4000, img: "platogrande" },
    { id: 3, nombre: "Tabla de asado", descripcion: "Tabla de asado", material: "Guayubira", medidas: "35x50", signo: "$", precio: 5000, img: "guayularga" },
    { id: 4, nombre: "Tabla pizzera", descripcion: "Tabla para pizza", material: "Guayubira", medidas: "37", signo: "$", precio: 5000, img: "pizzera" },
    { id: 5, nombre: "Plato chico", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x25", signo: "$", precio: 4000, img: "petiribi2" },
    { id: 6, nombre: "Plato grande", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x35", signo: "$", precio: 5000, img: "petiribi1" },
]

let carrito = []

// Autoquetas

autoquetas(etiquetas, carrito)

function autoquetas(etiquetas, carrito) {
    let contenedor = document.getElementById("card")
    contenedor.innerHTML = ""

    etiquetas.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "card"

        tarjeta.innerHTML = `
        <img src=./media/tablas/${producto.img}.jpeg class="card-img-top"
            alt=${producto.descripcion}>
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <p class="card-text">Medidas ${producto.medidas}cm</p>
                <p class="card-prize">$${producto.precio} </p>
                <a href="#nombre" class="btn btn-primary" id=${producto.id}>Agregar al carrito</a>
            </div>
        `
        contenedor.appendChild(tarjeta)

        let botonAgregrarCarrito = document.getElementById(producto.id)
        botonAgregrarCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(etiquetas, carrito, e))
    })
}


// Simulador Carrito v.2.4

/* principal(etiquetas)

function principal(etiquetas) {
    let carrito = []

    let opcion
    do {
        opcion = Number(prompt("Ingresar opción:\n1 - Listar productos\n2 - Ver información de un producto\n3 - Filtrar por material\n4 - Ordenar por nombre a-z\n5 - Ordenar por nombre z-a\n6 - Ordenar por precio a-z\n7 - Ordenar por precio z-a\n8 - Agregar producto al carrito\n9 - Finalizar compra\n10 - Crear etiqueta\n11 - Borrar etiqueta\n0 - para salir"))
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
            case 10:
                crear()
                break
            case 11:
                borrar()
                break
            default:
                break
        }
    } while (opcion != 0)
}
 */
function listar(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + " - Material: " + producto.material + " - $" + producto.precio).join("\n")
}

function descripcion(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + "\n" + producto.descripcion + "\n" + "Material: " + producto.material + "\n" + "Medidas: " + producto.medidas + "cm\n" + "Precio: $" + producto.precio).join("\n")
}

//Buscar productos por nombre

let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("buscar")

botonBuscar.addEventListener("click", () => buscarProducto(etiquetas))

function buscarProducto(etiquetas) {
    let productoElegido = false

    do {
        let textoBusqueda = buscador.value.trim().toLowerCase()
        let productoBuscado = etiquetas.filter(producto => producto.nombre.toLowerCase().includes(textoBusqueda))
        if (productoBuscado) {
            autoquetas(productoBuscado)
            productoElegido = true
        } else {
            alert("Producto incorrecto o inexistente")
        }
    } while (!productoElegido)
}

// Buscar por Material

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

// Agregar al carrito

function agregarProductoAlCarrito(etiquetas, carrito, e) {
    let productoBuscado = etiquetas.find(producto => producto.id === Number(e.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)

    if (productoBuscado) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades++
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
        } else {
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
        }
        alert("Se agregó producto al carrito")
    }
    mostrarCarrito(carrito)
}

function mostrarCarrito(productosCarrito) {
    let statusCarrito = document.getElementById("carrito")
    statusCarrito.innerHTML = ""

    productosCarrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "carrito"
        tarjetaCarrito.innerHTML = `
            <div class="card-body">
            <h4 class="carrito-title">${producto.nombre}</h4>
            <p class="carrito-prize">$${producto.precio} </p>
            <p class="carrito-prize">Cantidad :${producto.unidades} </p>
            <p class="carrito-prize">Subtotal :$${producto.subtotal} </p>
        </div>
    `
        statusCarrito.appendChild(tarjetaCarrito)
    })
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

    function Etiqueta(id, nombre, descripcion, material, medidas, signo, precio, img) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.material = material
        this.medidas = medidas
        this.signo = signo
        this.precio = parseInt(precio)
        this.valor = this.signo + this.precio
        this.img = img
    }

    let cantidad = Number(prompt("Cantidad"))

    for (let i = 0; i < cantidad; i++) {
        let id = etiquetas.length + 1
        let nombre = prompt("Ingresar nombre")
        let descripcion = prompt("Ingresar descripción")
        let material = prompt("Ingresar material")
        let medidas = prompt("Ingresar medidas")
        let signo = "$"
        let precio = prompt("Ingresar precio")
        let img = prompt("Ingresar nombre de imagen")

        let etiqueta = new Etiqueta(id, nombre, descripcion, material, medidas, signo, precio, img)
        etiquetas.push(etiqueta)
    }
}

//Función eliminar etiquetas

function borrar() {

    function eliminarEtiqueta(nombre) {
        let indice = etiquetas.findIndex(etiqueta => etiqueta.nombre === nombre);

        if (indice !== -1) {
            etiquetas.splice(indice, 1);
            console.log(`Etiqueta con nombre "${nombre}" eliminado correctamente.`)
        } else {
            console.log(`No se encontró ninguna etiqueta con nombre "${nombre}".`)
        }
    }

    let nombreAEliminar = prompt("Etiqueta a eliminar")
    eliminarEtiqueta(nombreAEliminar)
}

// Ver etiquetas

/* etiquetas.forEach((item) => {
    console.log(item.id)
    console.log(item.nombre)
    console.log("Confeccionado en " + item.material)
    console.log("Medidas: " + item.medidas + "cm")
    console.log("Precio: $" + item.precio)
}) */