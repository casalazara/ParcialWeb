/**
 * Profe perdone el spanglish D:
 */
let carrito = [];
let productos = [];

async function getData() {
  let response = await fetch(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  );
  let data = await response.json();
  return data;
}

getData().then((categories) => {
  categories.forEach((category) => {
    let cate = document.getElementById(category.name.split(" ").join("") + "R");
    category.products.forEach((producto) => {
      cate.innerHTML += `<div class="col-md-3 mb-3">
      <div class="card h-100">
        <img class="card-img-top imagenCarta" src=${producto.image} alt=${producto.name}>
        <div class="card-body">
          <h5 class="card-title">${producto.name}</h5>
          <p class="card-text">${producto.description}</p>
          <p class="card-text"><strong>$${producto.price}</strong></p>
          <a href="#${category.name}" class="btn btn-dark" onclick="addToCar('${producto.name}');">Add to car</a>
        </div>
      </div>
    </div>`;
      productos.push(producto);
    });
  });
  let tc = document.getElementById("tabla-carro");
  tc.hidden = true;
});

// eslint-disable-next-line no-unused-vars
function addToCar(product) {
  let obj = productos.find((producto) => producto.name === product);
  carrito.push(obj);
  car = document.getElementById("carrazo");
  car.innerHTML = carrito.length + " items";
}

function countApar(producto, productos) {
  let c = 0;
  productos.forEach((aux) => {
    if (aux.name === producto.name) {
      c++;
    }
  });
  return c;
}

// eslint-disable-next-line no-unused-vars
function orderDetail() {
  let cate = document.getElementById("myTabContent");
  cate.hidden = true;
  let tc = document.getElementById("tabla-carro");
  tc.hidden = false;

  let unicos = Array.from(new Set(carrito));
  let total = 0;
  let i = 0;
  unicos.forEach((producto) => {
    let count = countApar(producto, carrito);
    let tabla = document.getElementsByClassName("cuerpo")[0];
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let strong = document.createElement("strong");
    let item = document.createTextNode(++i);
    strong.appendChild(item);
    td1.appendChild(strong);
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    let cuenta = document.createTextNode(count);
    td2.appendChild(cuenta);
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    let nombre = document.createTextNode(producto.name);
    td3.appendChild(nombre);
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    let description = document.createTextNode(producto.price);
    td4.appendChild(description);
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    parc = producto.price * count;
    let amount = document.createTextNode(parc.toFixed(2));
    total += parc;
    td5.appendChild(amount);
    tr.appendChild(td5);
    tabla.appendChild(tr);
    return false;
  });
  document.getElementById("total").innerHTML = `Total $${total.toFixed(2)}`;
}

// eslint-disable-next-line no-unused-vars
function showMenu() {
  let cate = document.getElementById("myTabContent");
  cate.hidden = false;
  let tc = document.getElementById("tabla-carro");
  tc.hidden = true;
  limpiarTabla();
}

// eslint-disable-next-line no-unused-vars
function vaciar() {
  carrito = [];
  limpiarTabla();
  car = document.getElementById("carrazo");
  car.innerHTML = "";
  document.getElementById("total").innerHTML = `Total $${(0).toFixed(2)}`;
}

function limpiarTabla() {
  let filas = document.getElementsByClassName("cuerpo")[0];
  while (filas.firstChild) {
    filas.removeChild(filas.firstChild);
  }
}

// eslint-disable-next-line no-unused-vars
function generarRecibo() {
  let unicos = Array.from(new Set(carrito));
  let i = 0;
  let rta = [];
  unicos.forEach((producto) => {
    let count = countApar(producto, carrito);
    let obj = {
      item: ++i,
      quantity: count,
      description: producto.name,
      unitPrice: producto.price,
    };
    rta.push(obj);
  });
  // eslint-disable-next-line no-console
  console.log(rta);
}
