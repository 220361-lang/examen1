// URL de la API: Solicitamos 12 resultados para que la cuadrícula se vea bien
const API_URL = 'https://randomuser.me/api/?results=20';

// Selección del contenedor donde irán las tarjetas
const container = document.getElementById('user-container');

/**
 * Función asíncrona para obtener los datos de la API
 */
async function fetchUsers() {
    try {
        // Usamos 'no-cors' NO sirve aquí porque oculta los datos.
        // Intentamos una petición limpia directa.
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('La API no respondió correctamente');
        }

        const data = await response.json();
        console.log("Datos recibidos:", data); // Requisito de la rúbrica [cite: 31]
        renderUsers(data.results);

    } catch (error) {
        console.error("Hubo un error:", error);
        // Mensaje visible para el usuario si falla
        container.innerHTML = `<p style="color: red; text-align: center;">
            Error de seguridad (CORS). <br> 
            Intenta recargar la página o usa la Solución B.
        </p>`;
    }
}

/**
 * Función para renderizar los usuarios en el DOM
 * @param {Array} users - Lista de usuarios obtenida de la API
 */
function renderUsers(users) {
    // Limpiamos el mensaje de "Cargando..."
    container.innerHTML = '';

    users.forEach(user => {
        // Creamos el elemento div para la tarjeta
        const card = document.createElement('div');
        card.classList.add('user-card');

        // Construimos el contenido HTML de la tarjeta
        // Usamos datos anidados como user.name.first, user.email, etc.
        card.innerHTML = `
            <img src="${user.picture.large}" alt="Foto de ${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>País:</strong> ${user.location.country}</p>
            <p><strong>Tel:</strong> ${user.phone}</p>
        `;

        // Agregamos la tarjeta al contenedor principal
        container.appendChild(card);
    });
}

// Iniciamos la aplicación

document.addEventListener('DOMContentLoaded', fetchUsers);

