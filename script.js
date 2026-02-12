// URL de la API: Solicitamos 12 resultados para que la cuadrícula se vea bien
const API_URL = 'https://randomuser.me/api/?results=12';

// Selección del contenedor donde irán las tarjetas
const container = document.getElementById('user-container');

/**
 * Función asíncrona para obtener los datos de la API
 */
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error en la conexión con la API');
        }

        const data = await response.json();

        // REQUISITO IMPORTANTE: Mostrar el JSON en consola 
        console.log("Datos recibidos de la API:", data);

        // Llamamos a la función para renderizar los datos
        renderUsers(data.results);

    } catch (error) {
        console.error("Hubo un error:", error);
        container.innerHTML = `<p style="color: red; text-align: center;">Error al cargar los usuarios. Intenta de nuevo.</p>`;
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