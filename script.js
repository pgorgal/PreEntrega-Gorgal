// Productos

let etiquetas = [
    { id: 1, nombre: "Plato chico", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x25", signo: "$", precio: 3000, img: "plato" },
    { id: 2, nombre: "Plato grande", descripcion: "Plato de asado", material: "Guayubira", medidas: "25x35", signo: "$", precio: 4000, img: "platogrande" },
    { id: 3, nombre: "Tabla de asado", descripcion: "Tabla de asado", material: "Guayubira", medidas: "35x50", signo: "$", precio: 5000, img: "guayularga" },
    { id: 4, nombre: "Tabla pizzera", descripcion: "Tabla para pizza", material: "Guayubira", medidas: "37", signo: "$", precio: 5000, img: "pizzera" },
    { id: 5, nombre: "Plato chico", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x25", signo: "$", precio: 4000, img: "petiribi2" },
    { id: 6, nombre: "Plato grande", descripcion: "Plato de asado", material: "Petiribi", medidas: "25x35", signo: "$", precio: 5000, img: "petiribi1" },
]

let carritoRecuperado = localStorage.getItem("carrito")
let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : []
itemsCarrito(carrito)

// Contador carrito

function itemsCarrito(productosCarrito) {
    let contadorCarrito = document.getElementById("contador-carrito")
    contadorCarrito.textContent = productosCarrito.reduce((total, producto) => total + producto.unidades, 0)
}

// Autoquetas

autoquetas(etiquetas, carrito)

function autoquetas(etiquetas, carrito) {
    let contenedor = document.getElementById("card")
    contenedor.innerHTML = ""

    etiquetas.forEach(({ img, descripcion, nombre, medidas, precio, id }) => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "card"
        tarjeta.innerHTML = `
        <img src=./media/tablas/${img}.jpeg class="card-img-top"
            alt=${descripcion}>
            <div class="card-body">
                <h4 class="card-title">${nombre}</h4>
                <p class="card-text">Medidas ${medidas}cm</p>
                <p class="card-prize">$${precio} </p>
                    <div class="cantidades">
                        <span>
                            <button class="btn btn-default btn-minus tarjbtn" type="button" id="res-${id}">-</button>
                        </span>
                        <p class="cantidad">(<span id="cantidad-unidades" class="cantidad">0</span>)</p>
                        <span>
                            <button class="btn btn-default btn-plus tarjbtn" type="button" id="sum-${id}">+</button>
                        </span>             
                    </div>
            </div>
        `
        contenedor.appendChild(tarjeta)



        /*  let menos = document.getElementById(`res-${id}`)
         let idProducto = menos.id.substring(4)
         idProducto.addEventListener("click", (e) => quitarProductoDelCarrito(etiquetas, carrito, e)) */

        /* let mas = document.getElementById(`sum-${id}`)
        mas.addEventListener("click", (e) => agregarProductoAlCarrito(etiquetas, carrito, e)) */
    })
}

/* function itemsTarjeta(productosCarrito) {
    let contadorTarjeta = document.getElementById("cantidad-unidades")
    contadorTarjeta.textContent = productosCarrito.reduce((total, producto) => total + producto.unidades, 0)
}
 */
// Contador tarjetas

//VER!!!!

//Botón ordenar de A-Z

let botonAZ = document.getElementById("az")

botonAZ.addEventListener("click", () => {
    etiquetas.sort((a, b) => a.nombre.localeCompare(b.nombre))
    autoquetas(etiquetas, carrito)
})

//Botón ordenar de Z-A

let botonZA = document.getElementById("za")

botonZA.addEventListener("click", () => {
    etiquetas.sort((a, b) => b.nombre.localeCompare(a.nombre))
    autoquetas(etiquetas, carrito)
})

//Botón ordenar $<$

let botonMenor = document.getElementById("menor")

botonMenor.addEventListener("click", () => {
    etiquetas.sort((a, b) => a.precio - (b.precio))
    autoquetas(etiquetas, carrito)
})

//Botón ordenar $>$

let botonMayor = document.getElementById("mayor")

botonMayor.addEventListener("click", () => {
    etiquetas.sort((a, b) => b.precio - (a.precio))
    autoquetas(etiquetas, carrito)
})

// Listas de productos

function listar(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + " - Material: " + producto.material + " - $" + producto.precio).join("\n")
}

function descripcion(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + "\n" + producto.descripcion + "\n" + "Material: " + producto.material + "\n" + "Medidas: " + producto.medidas + "cm\n" + "Precio: $" + producto.precio).join("\n")
}

//Buscar productos por nombre

let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("buscar")

buscador.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault()
        buscarProducto(etiquetas)
    }
})

botonBuscar.addEventListener("click", () => buscarProducto(etiquetas))

function buscarProducto(etiquetas) {
    let productoElegido = false
    let textoBusqueda = buscador.value.trim().toLowerCase()

    let productoBuscado = etiquetas.filter(producto => producto.nombre.toLowerCase().includes(textoBusqueda))

    if (productoBuscado.length > 0) {
        autoquetas(productoBuscado)
        productoElegido = true
        buscador.value = ""
    } else {
        alert("Producto incorrecto o inexistente")
        autoquetas(etiquetas, carrito)
        buscador.value = ""
    }
}

// Buscar por Material

let buscadorMateriales = document.getElementById("buscadorMateriales")
let botonBuscarMateriales = document.getElementById("buscarMateriales")

buscadorMateriales.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault()
        buscarPorMaterial(etiquetas)
    }
})

botonBuscarMateriales.addEventListener("click", () => buscarPorMaterial(etiquetas))

function buscarPorMaterial(productos) {
    let materialElegido = false
    let textoBusquedaMateriales = buscadorMateriales.value.trim().toLowerCase()

    let materialBuscado = productos.filter(etiqueta => etiqueta.material.toLowerCase().includes(textoBusquedaMateriales))

    if (materialBuscado.length > 0) {
        autoquetas(materialBuscado)
        materialElegido = true
        buscadorMateriales.value = ""
    } else {
        alert("Materiales disponibles:\n" + listarMaterialesUnicos(productos))
        autoquetas(etiquetas, carrito)
        buscadorMateriales.value = ""
    }
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
                img: productoBuscado.img,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    itemsCarrito(carrito)
}

// Quitar del carrito

function quitarProductoDelCarrito(etiquetas, carrito, e) {
    let productoBuscado = etiquetas.find(producto => producto.id === Number(e.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)

    if (productoBuscado) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades--
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
        } else {
            carrito.push({
                id: productoBuscado.id,
                img: productoBuscado.img,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    itemsCarrito(carrito)
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
