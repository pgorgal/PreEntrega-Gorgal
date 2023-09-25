// Ver carrito

let carrito = []

let carritoRecuperado = localStorage.getItem("carrito")
if (carritoRecuperado) {
    carrito = JSON.parse(carritoRecuperado)
}

document.addEventListener("DOMContentLoaded", () => {
    let carro = document.getElementById("carrito")
    mostrarCarrito(carrito)
})

function mostrarCarrito(carrito) {
    let statusCarrito = document.getElementById("carrito")
    statusCarrito.innerHTML = ""

    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "carrito"
        tarjetaCarrito.innerHTML = `
        <img src=./media/tablas/${producto.img}.jpeg class="card-img-top  fotocarro"
            alt=${producto.descripcion}>
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <p class="card-carrito">Precio unitario: $${producto.precioUnitario} </p>
                <p class="card-carrito">Unidades: ${producto.unidades}</p>
                <p class="card-carrito">Subtotal: $${producto.subtotal} </p>
            </div>
        `
        statusCarrito.appendChild(tarjetaCarrito)
    })
}

// Finalizar compra

let botonComprar = document.getElementById("comprar")

botonComprar.addEventListener("click", () => finalizarCompra(carrito))

function finalizarCompra(carrito) {
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
        let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
        alert("El total a pagar es " + total)
        alert("Gracias por su compra")

        carrito = []
        localStorage.removeItem("carrito")   
        autoquetas([])
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
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "carrito"
        tarjetaCarrito.innerHTML = `
                <p class="card-carrito">El carrito está vacio</p>        
        `       
    }
}