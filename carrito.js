const carritoContainer = document.getElementById("carrito");
const cuentaTotal = document.getElementById("total");
const btnFinalizarCompra = document.getElementById("finalizarCompra");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function imprimirCarrito() {
  carritoContainer.innerHTML = "";
  carrito.forEach(
    (item) =>
      (carritoContainer.innerHTML += `<li><div><img src="${item.imagen}" /> ${
        item.nombre
      } x ${item.cantidad}</div> <div>$${
        item.cantidad * item.precio
      }<i class='bx bxs-trash' data-id='${item.id}'></i></div></li>`)
  );
  if (carrito !== []) {
    const btnEliminar = document.querySelectorAll(".bxs-trash");
    btnEliminar.forEach((btn) => {
      btn.onclick = (e) => {
        const productoId = e.target.getAttribute("data-id");
        carrito = carrito.filter((prod) => prod.id != productoId);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        imprimirCarrito();
      };
    });
  }
  crearTotal();
}
function crearTotal() {
  sumatotal = 0;
  carrito.forEach((producto) => {
    sumatotal += producto.precio * producto.cantidad;
  });
  const total = document.querySelector("#total");

  sumatotal !== 0
    ? (total.innerHTML = `<span>El total es de $${sumatotal}</span>`)
    : carritoVacio();
}

function carritoVacio() {
  total.innerHTML = `El carrito esta vacio`;
  btnFinalizarCompra.style.display = "none";
}

function finalizar() {
  swal(
    "Compra realizada con exito",
    "Recibirá los datos de la compra por mail",
    "success"
  );
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));

  imprimirCarrito();
}

crearTotal();

imprimirCarrito();

btnFinalizarCompra.addEventListener("click", finalizar);
