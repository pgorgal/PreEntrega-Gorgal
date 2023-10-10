// Fetch

fetch("./info.json")
    .then(respuesta => respuesta.json())
    .then(etiquetas => principal(etiquetas))

// Principal

function principal(etiquetas) {

    // Autoquetas

    autoquetas(etiquetas, carrito)

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

    //Buscar productos por nombre

    let buscador = document.getElementById("buscador")
    let botonBuscar = document.getElementById("buscar")

    buscador.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            buscarProducto(etiquetas, buscador)
        }
    })

    botonBuscar.addEventListener("click", () => buscarProducto(etiquetas, buscador))

    // Buscar por Material

    let buscadorMateriales = document.getElementById("buscadorMateriales")
    let botonBuscarMateriales = document.getElementById("buscarMateriales")

    buscadorMateriales.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            buscarPorMaterial(etiquetas, buscadorMateriales)
        }
    })

    botonBuscarMateriales.addEventListener("click", () => buscarPorMaterial(etiquetas, buscadorMateriales))
}

let carritoRecuperado = localStorage.getItem("carrito")
let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : []

itemsCarrito(carrito)

// Contador carrito

function itemsCarrito(productosCarrito) {
    let contadorCarrito = document.getElementById("contador-carrito")
    contadorCarrito.textContent = productosCarrito.reduce((total, producto) => total + producto.unidades, 0)
}

// Autoquetas

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
                        <p class="cantidad">(<span id="cantidad-${id}" class="cantidad">${obtenerCantidadProducto(carrito, id)}</span>)</p>
                        <span>
                            <button class="btn btn-default btn-plus tarjbtn" type="button" id="sum-${id}">+</button>
                        </span>             
                    </div>
            </div>
        `
        contenedor.appendChild(tarjeta)

        let menos = document.getElementById(`res-${id}`)
        menos.addEventListener("click", () => modificarCantidad(etiquetas, carrito, id, -1))

        let mas = document.getElementById(`sum-${id}`)
        mas.addEventListener("click", () => modificarCantidad(etiquetas, carrito, id, 1))

        let cantidadProductos = obtenerCantidadProducto(carrito, id)
        if (cantidadProductos === 0) {
            menos.disabled = true
        } else {
            menos.disabled = false
        }
        console.log(carrito)
    })
}

// Sumar y restar al carrito

function modificarCantidad(etiquetas, carrito, idProducto, cantidad) {
    let productoBuscado = etiquetas.find(producto => producto.id === idProducto)
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto)

    if (productoBuscado) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades += cantidad
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
            if (cantidad > 0) {
                tostada("Se agregó el producto al carrito", 1500)
            } else if (cantidad < 0) {
                tostada("Se quitó el producto del carrito", 1500)
            }
            actualizarBotonMenos(idProducto, carrito)
        } else {
            carrito.push({
                id: productoBuscado.id,
                img: productoBuscado.img,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal: productoBuscado.precio
            })
            tostada("Se agregó el producto al carrito", 1500)
        }
        localStorage.setItem("carrito", JSON.stringify(carrito))
        actualizarCantidad(idProducto, carrito)
    }
    itemsCarrito(carrito)
}

function actualizarBotonMenos(idProducto, carrito) {
    let menos = document.getElementById(`res-${idProducto}`)
    let cantidadActual = obtenerCantidadProducto(carrito, idProducto)

    menos.disabled = cantidadActual === 0
}

// Tostadas

function tostada(text, duration) {
    Toastify({
        text,
        duration,
        style: {
            background: "linear-gradient(150deg, rgb(136, 54, 2) 0%, rgb(255, 165, 66) 49%, rgb(252, 176, 69) 68%, rgb(221, 143, 35) 88%, rgb(198, 116, 0) 100%)",
        }
    }).showToast()
}

// Contador tarjetas

function actualizarCantidad(idProducto, carrito) {
    let cantidadElement = document.getElementById(`cantidad-${idProducto}`)
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto)

    if (cantidadElement && productoEnCarrito) {
        cantidadElement.textContent = productoEnCarrito.unidades
    }
}

function obtenerCantidadProducto(carrito, idProducto) {
    let productoEnCarrito = carrito.find(producto => producto.id === idProducto)
    return productoEnCarrito ? productoEnCarrito.unidades : 0
}

// Listas de productos

function listar(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + " - Material: " + producto.material + " - $" + producto.precio).join("\n")
}

function descripcion(productos) {
    return productos.map(producto => producto.id + " - " + producto.nombre + "\n" + producto.descripcion + "\n" + "Material: " + producto.material + "\n" + "Medidas: " + producto.medidas + "cm\n" + "Precio: $" + producto.precio).join("\n")
}

function buscarProducto(etiquetas, buscador) {
    let productoElegido = false
    let textoBusqueda = buscador.value.trim().toLowerCase()

    let productoBuscado = etiquetas.filter(producto => producto.nombre.toLowerCase().includes(textoBusqueda))

    if (productoBuscado.length > 0) {
        autoquetas(productoBuscado, carrito)
        productoElegido = true
        buscador.value = ""
    } else {
        tostada("Producto incorrecto o inexistente", 2000)
        autoquetas(etiquetas, carrito)
        buscador.value = ""
    }
}

function buscarPorMaterial(etiquetas, buscadorMateriales) {
    let textoBusquedaMateriales = buscadorMateriales.value.trim().toLowerCase();

    let materialBuscado = etiquetas.filter(etiqueta => etiqueta.material.toLowerCase().includes(textoBusquedaMateriales));

    if (materialBuscado.length > 0) {
        autoquetas(materialBuscado, carrito)
        buscadorMateriales.value = ""
    } else {
        Swal.fire({
            title: 'Material no encontrado',
            text: 'Materiales disponibles: ' + listarMaterialesUnicos(etiquetas),
            icon: 'warning'
        })
        autoquetas(etiquetas, carrito)
        buscadorMateriales.value = ""
    }
}

function listarMaterialesUnicos(productos) {
    let materialesUnicos = [...new Set(productos.map(item => item.material))]
    return materialesUnicos.join("\n")
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
