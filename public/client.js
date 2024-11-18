const ws = new WebSocket('ws://localhost:3000');

// Solicitar el nombre de usuario solo al principio
let username = prompt('Por favor ingresa tu nombre de usuario:');

// Enviar el nombre de usuario cuando se abre la conexión
ws.onopen = () => {
  if (username) {
    console.log('Enviando nombre de usuario:', username);
    ws.send(username);  // Enviamos el nombre de usuario al servidor
  }
};

// Recibir mensajes del servidor
ws.onmessage = (event) => {
  const message = event.data;
  displayMessage(message, false);  // false indica que no es el propio mensaje
};

// Función para mostrar el mensaje en la interfaz
function displayMessage(message, isSentByUser) {
  const messageArea = document.getElementById('messageArea');
  const messageElement = document.createElement('div');
  
  // Dividir el mensaje en nombre y mensaje
  const messageParts = message.split(': ');

  if (messageParts.length > 1) {
    const sender = messageParts[0]; // Nombre del remitente
    const text = messageParts.slice(1).join(': '); // Mensaje

    // Crear el nombre con color
    const senderName = document.createElement('span');
    senderName.textContent = `${sender}: `;
    if (isSentByUser) {
      senderName.style.color = 'red'; // Si es el usuario, color rojo
    } else {
      senderName.style.color = 'blue'; // Si es otro usuario, color azul
    }

    // Crear el mensaje
    const messageText = document.createElement('span');
    messageText.textContent = text;

    messageElement.appendChild(senderName);
    messageElement.appendChild(messageText);
  } else {
    messageElement.textContent = message;
  }

  messageArea.appendChild(messageElement);
}

// Función para enviar el mensaje
function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  if (message.trim() !== "") {  // Solo enviar si el mensaje no está vacío
    // Mostrar el mensaje en el área de mensajes inmediatamente
    displayMessage(`Tú: ${message}`, true);  // true indica que el mensaje es del usuario

    // Enviar el mensaje al servidor
    ws.send(message);

    // Limpiar el campo de entrada
    messageInput.value = '';
  }
}

// Escuchar el evento 'click' en el botón de enviar
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Escuchar la tecla 'Enter' para enviar el mensaje
const messageInput = document.getElementById('messageInput');
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {  // Comprobar si la tecla presionada es 'Enter'
    event.preventDefault();  // Prevenir la acción predeterminada (salto de línea)
    sendMessage();  // Llamar a la función para enviar el mensaje
  }
});
