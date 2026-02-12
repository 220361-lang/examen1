// URL de FakeStoreAPI (Trae 20 productos por defecto)
const API_URL = 'https://fakestoreapi.com/products';

const container = document.getElementById('products-container');

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('No se pudo conectar con la tienda');
        }

        const data = await response.json();

        // REQUISITO RÚBRICA: Mostrar JSON en consola
        console.log("Catálogo de productos recibido:", data);

        renderProducts(data);

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = `<p style="color: red; text-align: center;">Error al cargar la tienda. Intenta más tarde.</p>`;
    }
}

function renderProducts(products) {
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Renderizamos imagen, categoría, título y precio
        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <p class="category">${product.category}</p>
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
                <button class="btn-add">Agregar al Carrito</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', fetchProducts);
