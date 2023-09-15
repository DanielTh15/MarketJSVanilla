/* .innerHTML introduce html dentreo de un contenedor al cual le hayamos asignado un id y haberlo traído 
con un query selector en una variable */

const productos = [{
    id: "manzana-01",
    titulo: "Green apple",
    imagen: "./img/apples.png",
    precio: 1800,
    categoria: {
        nombre: "frutas y verduras",
        id: "FrutasVerduras"
    }
},
{
    id: "pescado-01",
    titulo: "fresh fish",
    imagen: "./img/fish.jpg",
    precio: 4000,
    categoria: {
        nombre: "Carnes y pescado",
        id: "CarnesPescados"
    }
},
{
    id: "yogurt-01",
    titulo: "Pink yogurt",
    imagen: "./img/yogurt.jpg",
    precio: 2100,
    categoria: {
        nombre: "Lacteos y huevos",
        id: "LacteosHuevos"
    }
}


]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
// const productosEnCarrito = [];
const numerito = document.querySelector("#numerito");

function cargarProductos(productos) {
    contenedorProductos.innerHTML = "";
    productos.forEach(producto => {
        const mostrar = document.createElement("div");
        mostrar.classList.add("producto");
        mostrar.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen">
                <div class="producto-detalles">
                    <h3 class="prducto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                    <button class="producto-agregar" id=${producto.id}>Agregar</button>
                </div>
    `;
        contenedorProductos.append(mostrar);
    })
    actualizarBotonesAgregar(); // después de esta funcion que renderiza la lista de productos puedo accerder a cada 
    // botón de producto (AGREGAR) renderizado  para poder usarlos en el carrito

}
cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }


    })
})

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => boton.addEventListener("click", agregarAlCarrito))
}


let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"))
if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    // .some de arrays en java verifica si ya existe en el arreglo ese id 
    // la funcion some ejecuta una función una vez por cada elementos presente en el array
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acum, producto) => acum + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}