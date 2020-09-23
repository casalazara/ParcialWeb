/**
 * Profe perdone el spanglish D:
 */
var carrito = [];
var productos = [];

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
      cate.innerHTML += `<div class="col-3 mb-3">
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
    var item = document.createTextNode(++i);
    td1.appendChild(item);
    tr.appendChild(td1);

    var td2 = document.createElement("td");
    var cuenta = document.createTextNode(count);
    td2.appendChild(cuenta);
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    var nombre = document.createTextNode(producto.name);
    td3.appendChild(nombre);
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    var description = document.createTextNode(producto.price);
    td4.appendChild(description);
    tr.appendChild(td4);

    var td5 = document.createElement("td");
    parc = producto.price * count;
    var amount = document.createTextNode(parc.toFixed(2));
    total += parc;
    td5.appendChild(amount);
    tr.appendChild(td5);
    tabla.appendChild(tr);
    return false;
  });
  document.getElementById("total").innerHTML = `Total $${total.toFixed(2)}`;
}

function showMenu() {
  let cate = document.getElementById("myTabContent");
  cate.hidden = false;
  let tc = document.getElementById("tabla-carro");
  tc.hidden = true;

  limpiarTabla();
}

function vaciar() {
  carrito = [];
  limpiarTabla();
  car = document.getElementById("carrazo");
  car.innerHTML = "";
}

function limpiarTabla() {
  let filas = document.getElementsByClassName("cuerpo")[0];
  while (filas.firstChild) {
    filas.removeChild(filas.firstChild);
  }
}

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
  console.log(rta);
}
