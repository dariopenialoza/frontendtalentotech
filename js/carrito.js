import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

const renderizarCarrito = () => {
  //Leemos cantidad de productos en carrito para mostrar
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  //Accedemos al nodo donde vamos a mostrar las tarjetas de producto
  const contenedor = document.getElementById("contenedor-carrito");

  // Botones de acciones
  const divAcciones = document.getElementById("acciones-carrito");

  //Esta lineas limpian los contenedor antes de renderizar tarjetas y botones
  contenedor.innerHTML = "";
  divAcciones.innerHTML = "";

  //Sino hay productos en el carrito
  if (!carrito.length) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-carrito-vacio");
    mensaje.textContent = " Tu carrito esta vacio 😕";
    contenedor.appendChild(mensaje);

    //IMPORTANTE: sin el return, la funcion no corta e intenta renderizar tarjetas
    //El return corta por completo la funcion "renderizarCarrito"
    return;
  }

  //Si hay productos en el carrito
  carrito.forEach((producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    const img = document.createElement("img");

    //Ojo la ruta de imagen⚠️
    img.src = `../${producto.img}`;
    img.alt = producto.nombre;

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;
    titulo.classList.add("titulo-productos");

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;
    precio.classList.add("precio-producto");

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "bg-secondary", "text-dark");
    btnEliminar.textContent = "Eliminar producto";

    btnEliminar.addEventListener("click", () => {
      eliminarProducto(index);
      renderizarCarrito();
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(btnEliminar);

    contenedor.appendChild(tarjeta);
  });

  const btnVaciar = document.createElement("button");
  btnVaciar.classList.add("btn", "bg-secondary", "text-dark");
  btnVaciar.textContent = "Vaciar carrito";

  btnVaciar.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarrito();
  });

  divAcciones.appendChild(btnVaciar);
};

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
});
