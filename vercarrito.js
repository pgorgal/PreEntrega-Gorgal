// Ver carrito

let carritoRecuperado = localStorage.getItem("carrito")
let carrito = carritoRecuperado ? JSON.parse(carritoRecuperado) : []
mostrarCarrito(carrito)

document.addEventListener("DOMContentLoaded", () => {
    let carro = document.getElementById("carrito")
    mostrarCarrito(carrito)
})

function mostrarCarrito(carrito) {
    if (carrito.length === 0) {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "carrito"
        tarjetaCarrito.innerHTML = `
                <p class="card-carrito">Primero debe agregar productos al carrito</p>        
        `
        let contenedorCarrito = document.getElementById("carrito")
        contenedorCarrito.innerHTML = ""
        contenedorCarrito.appendChild(tarjetaCarrito)
    } else {
        let statusCarrito = document.getElementById("carrito")
        statusCarrito.innerHTML = ""

        carrito.forEach(({img, descripcion, nombre, precioUnitario, unidades, subtotal}) => {
            let tarjetaCarrito = document.createElement("div")
            tarjetaCarrito.className = "carrito"
            tarjetaCarrito.innerHTML = `
        <img src=./media/tablas/${img}.jpeg class="card-img-top  fotocarro"
            alt=${descripcion}>
            <div class="card-body">
                <h4 class="card-title">${nombre}</h4>
                <p class="card-carrito">Precio unitario: $${precioUnitario} </p>
                <p class="card-carrito">Unidades: ${unidades}</p>
                <p class="card-carrito">Subtotal: $${subtotal} </p>
            </div>
        `
            statusCarrito.appendChild(tarjetaCarrito)
        })
    }
}

// Finalizar compra

let botonComprar = document.getElementById("comprar")

botonComprar.addEventListener("click", () => finalizarCompra(carrito))

function finalizarCompra(carrito) {
    if (carrito.length === 0) {
        alert("Primero debe agregar productos al carrito")
    } else {
        let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
        alert("El total a pagar es " + total)
        alert("Gracias por su compra")

        carrito = []
        localStorage.removeItem("carrito")
        mostrarCarrito(carrito)
    }
}

// Vaciar carrito 

let botonVaciar = document.getElementById("vaciar")

botonVaciar.addEventListener("click", () => vaciarCarrito(carrito))

function vaciarCarrito(carrito) {
    if (carrito.length === 0) {
        alert("No hay productos en el carrito")
    } else {
        carrito = []
        localStorage.removeItem("carrito")
        mostrarCarrito(carrito)
    }
}