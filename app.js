const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#ffffff';
	} else {
		header.style.backgroundColor = '#4d4d4d';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// MARKET PLACE
// Variables globales
let cart = [];
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout-button');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');

// Función para actualizar el carrito
function updateCart() {
  cartCount.textContent = cart.length;

  // Limpiar los productos actuales del carrito
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  // Agregar cada producto del carrito
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button class="remove-item" data-id="${item.id}">Eliminar</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    totalPrice += item.price;

    // Agregar evento de eliminar producto
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
      removeFromCart(item.id);
    });
  });

  // Actualizar el total
  totalPriceContainer.textContent = totalPrice.toFixed(2);
}

// Función para agregar un producto al carrito
function addToCart(product) {
  cart.push(product);
  updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Función para mostrar el carrito
cartButton.addEventListener('click', () => {
  cartModal.style.display = 'flex';
});

// Función para cerrar el carrito
closeCartButton.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Evento para los botones de añadir al carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productElement = button.closest('.product-item');
    const product = {
      id: productElement.dataset.id,
      name: productElement.querySelector('h3').textContent,
      img: productElement.querySelector('img').src,
      price: parseFloat(productElement.querySelector('p').textContent.replace('Precio: $', ''))
    };
    addToCart(product);
  });
});

// Función para procesar la compra (puedes personalizarla según lo que necesites)
checkoutButton.addEventListener('click', () => {
  alert('¡Gracias por tu compra!');
  cart = [];
  updateCart();
});
