const consultarProductos = async () => {
  const response = await fetch("./productos.json");
  const productos = await response.json();
  return productos;
};

const productos = consultarProductos();

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Imprimir elementos en el DOM

const divProductos = document.getElementById("divProductos");


consultarProductos().then((productos) => {
  productos.forEach((producto) => {
    divProductos.innerHTML += ` <div id="${producto.id}" class="card">
    <div class="card-body">
      <h4 class="card-title">${producto.nombre}</h4>
      <img src="${producto.imagen}" alt="">
      <p class="card-text">$${producto.precio}</p>
      <button id="${producto.id}" class="btn btn-primary agregar-favorito">Añadir al carrito</button>
    </div>
  </div>`;
  });
  btnComprar(productos);
});

function btnComprar(productos) {
  const btnAgregar = document.querySelectorAll(".agregar-favorito");
  console.log(btnAgregar);
  btnAgregar.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const productoSeleccionado = productos.find(
        (prod) => prod.id === parseInt(btn.id)
      );
      const productoCarrito = { ...productoSeleccionado, cantidad: 1 };
      const indexCarrito = carrito.findIndex(
        (prod) => prod.id === productoCarrito.id
      );
      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad++;
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      btnFinalizar.style.display = "block";
    };
  });
}
