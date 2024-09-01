let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const tarjJuego = (arrayjuegos) => {
  let containerProducts = document.getElementById("products-container");
  containerProducts.innerHTML = "";

  arrayjuegos.forEach((producto) => {
    let productCard = document.createElement("div");
    productCard.className = "producto";
    productCard.innerHTML = `<img src=${producto.image} class="imagen" />
        <h3 class="titulo">${producto.title}</h3>
        <p id="descripcion">${producto.description}</p>
        <p class="precio">$${producto.price}</p>
        <button class="boton" onclick="eliminarDelCarrito(${producto.id})">
        Eliminar</button>
        `;
    containerProducts.appendChild(productCard);
  });
};

tarjJuego(carrito);

// const eliminarDelCarrito = (id) => {
//   carrito = carrito.filter((elemento) => elemento.id !== id);
//   localStorage.setItem("carrito", JSON.stringify(carrito));
//   tarjJuego(carrito);
// };

const eliminarDelCarrito = (id) => {
  Swal.fire({
    title: "Seguro quieres eliminar?",
    showDenyButton: true,
    confirmButtonText: "Si, eliminar",
    denyButtonText: `No, no eliminar`,
  }).then((res) => {
    console.log(res);
    if (res.isConfirmed) {
      carrito = carrito.filter((elemento) => elemento.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      tarjJuego(carrito);
      Swal.fire({
        title: "eliminado!",
        icon: "info",
      });
    } else if (res.isDenied) {
      Swal.fire({
        title: "No se elimina",
        icon: "info",
      });
    }
  });
};
