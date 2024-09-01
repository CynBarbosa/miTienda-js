let juegos = [];

document.addEventListener("DOMContentLoaded", () => {
  const getProducts = fetch("https://fakestoreapi.com/products");
  getProducts
    .then((res) => res.json())
    .then((res) => {
      juegos = res;
      tarjJuego(juegos);
    });
});

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
        <button class="boton" onclick="agregarAlCarrito(${producto.id})">
        Agregar al carrito</button>
      `;
    containerProducts.appendChild(productCard);
  });
};

tarjJuego(juegos);

const inputSearch = document.getElementById("search");
if (inputSearch) {
  inputSearch.addEventListener("input", (evento) => {
    let value = evento.target.value.toLowerCase();
    let arrayFiltrado = juegos.filter((juego) =>
      juego.title.toLowerCase().includes(value)
    );
    tarjJuego(arrayFiltrado);
  });
}

const agregarAlCarrito = (id) => {
  console.log(id);
  let juego = juegos.find((elemento) => elemento.id === id);
  let productoEnElCarrito = carrito.find((elemento) => elemento.id === id);
  if (productoEnElCarrito) {
    alert("ya esta en el carrito");
  } else {
    carrito.push(juego);
    Toastify({
      text: "Agregado Exitosamente",
      gravity: "bottom",
      position: "right",
      backgroundColor: "black",
      close: true,
    }).showToast();
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
};
