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
document.addEventListener("DOMContentLoaded", function () {
    const apiURL = 'https://fakestoreapi.com/products?limit=6'; // API de productos
    const productList = document.getElementById("product-list");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-button");
    const closeCartButton = document.getElementById("close-cart");

    // Función para cargar productos desde la API
    async function loadProducts() {
        try {
            const response = await fetch(apiURL);
            const data = await response.json(); // Obtener los datos de la API
            const products = data;  // Los productos

            // Recorrer los productos y crear los elementos HTML
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-item");

                productElement.innerHTML = `
                    <div class="product-info">
                        <img src="${product.image}" alt="${product.title}" />
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p><strong>$${product.price}</strong></p>
                        <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Añadir al carrito</button>
                    </div>
                `;

                productList.appendChild(productElement);
            });

            // Agregar evento de añadir al carrito
            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            addToCartButtons.forEach(button => {
                button.addEventListener("click", addToCart);
            });
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    // Función para agregar productos al carrito
    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute("data-id");
        const productTitle = button.getAttribute("data-title");
        const productPrice = parseFloat(button.getAttribute("data-price"));
        const productImage = button.getAttribute("data-image");

        // Verificar que los datos no estén vacíos antes de almacenarlos
        if (!productId || !productTitle || isNaN(productPrice) || !productImage) {
            console.error("Error: Datos del producto incompletos.");
            return;
        }

        // Obtener el carrito actual o iniciar uno vacío
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cartItems.find(item => item.id === productId);

        // Si el producto ya está en el carrito, solo incrementamos la cantidad
        if (existingProduct) {
            existingProduct.quantity += 1; 
        } else {
            // Si el producto no está, lo añadimos al carrito
            cartItems.push({
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage,
                quantity: 1,
            });
        }

        // Guardamos el carrito actualizado en localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Actualizamos el carrito en la vista y abrimos el modal
        updateCart();
        openCart();
    }

    // Función para actualizar el carrito en la vista
    function updateCart() {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ""; // Limpiar el carrito
        let totalPrice = 0;

        // Verificar que hay productos en el carrito
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
            totalPriceElement.textContent = "0.00";
            return;
        }

        // Mostrar los elementos del carrito
        cartItems.forEach(item => {
            if (!item.price || !item.title || !item.quantity || !item.image) {
                console.error("Producto con datos faltantes en el carrito", item);
                return;
            }

            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" />
                <div>
                    <p>${item.title}</p>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);

            totalPrice += item.price * item.quantity;
        });

        // Actualizamos el precio total
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    // Función para abrir el carrito
    function openCart() {
        cartModal.style.display = "flex";
    }

    // Función para cerrar el carrito
    function closeCart() {
        cartModal.style.display = "none";
    }

    // Mostrar el carrito al cargar la página
    updateCart();
    loadProducts();

    // Botón para abrir el carrito
    checkoutButton.addEventListener("click", openCart);

    // Botón para cerrar el carrito
    closeCartButton.addEventListener("click", closeCart);

    // Cerrar el carrito haciendo clic fuera del contenido
    cartModal.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            closeCart();
        }
    });
});


