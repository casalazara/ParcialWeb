let carrito = [];
let categories = [];
let productos = [];

async function getData() {
  let response = await fetch(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  );
  let data = await response.json();
  return data;
}

getData().then((categorias) => {
  categories = categorias;
  categories.forEach((category) => {
    let cate = document.getElementById(category.name + "Deck");
    category.products.forEach((producto) => {
      cate.innerHTML += `<div class="card producto">
      <img class="card-img-top" src=${producto.image} alt=${producto.name}>
      <div class="card-body">
        <h5 class="card-title">${producto.name}</h5>
        <p class="card-text">${producto.description}</p>
        <p class="card-text"><strong>$${producto.price}</strong></p>
        <a href="#" class="btn btn-dark" onclick="addToCar('${producto.name}');">Add to car</a>
        </div>
    </div>`;
      productos.push(producto);
    });
  });
});

function addToCar(product) {
  let obj = productos.find((producto) => producto.name === product);
  carrito.push(obj);
}

function orderDetail() {
  let;
}
