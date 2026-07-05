// ===== ESTADO DEL CARRITO =====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productos = [];

// ===== HELPERS =====
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const total = carrito.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById("cart-count").textContent = total;
}

// ===== FETCH DE PRODUCTOS (FakeStore API: ropa de hombre + accesorios) =====
async function cargarProductos() {
  const contenedor = document.getElementById("productos-container");
  try {
    const [respuestaRopa, respuestaJoyeria] = await Promise.all([
      fetch("https://fakestoreapi.com/products/category/men's%20clothing"),
      fetch("https://fakestoreapi.com/products/category/jewelery"),
    ]);

    if (!respuestaRopa.ok) throw new Error("Error HTTP (ropa): " + respuestaRopa.status);
    if (!respuestaJoyeria.ok) throw new Error("Error HTTP (accesorios): " + respuestaJoyeria.status);

    const [ropa, joyeria] = await Promise.all([
      respuestaRopa.json(),
      respuestaJoyeria.json(),
    ]);

    productos = [...ropa, ...joyeria];
    renderizarProductos();
  } catch (error) {
    contenedor.innerHTML = "<p>No se pudieron cargar los productos. Intentá más tarde.</p>";
    console.error(error);
  }
}

function renderizarProductos() {
  const contenedor = document.getElementById("productos-container");
  contenedor.innerHTML = "";
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p class="precio">$${producto.price.toFixed(2)}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

// ===== CARRITO =====
function agregarAlCarrito(id, boton) {
  const existente = carrito.find((item) => item.id === id);
  if (existente) {
    existente.qty++;
  } else {
    const producto = productos.find((p) => p.id === id);
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      qty: 1,
    });
  }
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
  abrirCarrito();

  if (boton) {
    boton.classList.add("agregado");
    setTimeout(() => boton.classList.remove("agregado"), 800);
  }
}

function cambiarCantidad(id, delta) {
  const item = carrito.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    carrito = carrito.filter((i) => i.id !== id);
  }
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((i) => i.id !== id);
  guardarCarrito();
  actualizarContador();
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito-container");
  const totalSpan = document.getElementById("carrito-total");

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalSpan.textContent = "0.00";
    return;
  }

  contenedor.innerHTML = "";
  carrito.forEach((item) => {
    const fila = document.createElement("div");
    fila.className = "carrito-item";
    fila.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <span class="carrito-titulo">${item.title}</span>
      <button data-accion="restar" data-id="${item.id}" aria-label="Restar uno">-</button>
      <span>${item.qty}</span>
      <button data-accion="sumar" data-id="${item.id}" aria-label="Sumar uno">+</button>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button data-accion="eliminar" data-id="${item.id}" aria-label="Eliminar producto">🗑️</button>
    `;
    contenedor.appendChild(fila);
  });

  const total = carrito.reduce((acc, item) => acc + item.price * item.qty, 0);
  totalSpan.textContent = total.toFixed(2);
}

// ===== DRAWER DEL CARRITO =====
const carritoAside = document.getElementById("carrito");
const overlay = document.getElementById("overlay");

function abrirCarrito() {
  carritoAside.classList.add("abierto");
  overlay.classList.add("abierto");
  carritoAside.setAttribute("aria-hidden", "false");
}

function cerrarCarrito() {
  carritoAside.classList.remove("abierto");
  overlay.classList.remove("abierto");
  carritoAside.setAttribute("aria-hidden", "true");
}

document.getElementById("btn-carrito").addEventListener("click", (e) => {
  e.preventDefault();
  abrirCarrito();
});

document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarCarrito();
});

// ===== EVENTOS (delegación) =====
document.getElementById("productos-container").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    agregarAlCarrito(Number(e.target.dataset.id), e.target);
  }
});

document.getElementById("carrito-container").addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const id = Number(e.target.dataset.id);
  const accion = e.target.dataset.accion;
  if (accion === "sumar") cambiarCantidad(id, 1);
  if (accion === "restar") cambiarCantidad(id, -1);
  if (accion === "eliminar") eliminarDelCarrito(id);
});

// ===== VALIDACIÓN DEL FORMULARIO =====
document.getElementById("form-contacto").addEventListener("submit", (e) => {
  const nombre = document.getElementById("input-nombre").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const mensaje = document.getElementById("input-mensaje").value.trim();
  const errorP = document.getElementById("form-error");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  errorP.textContent = "";

  if (!nombre || !email || !mensaje) {
    e.preventDefault();
    errorP.textContent = "Todos los campos son obligatorios.";
    return;
  }
  if (!regexEmail.test(email)) {
    e.preventDefault();
    errorP.textContent = "El formato del email no es válido.";
  }
  // Si pasa la validación, el form se envía normalmente a Formspree.
});

// ===== INICIO =====
cargarProductos();
actualizarContador();
renderizarCarrito();
