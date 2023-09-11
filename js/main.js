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

function cargarProductos(productos){
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
}
cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
     botonesCategorias.forEach(boton => boton.classList.remove("active"));
      e.currentTarget.classList.add("active");
      const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
      cargarProductos(productosBoton);

    })
})

