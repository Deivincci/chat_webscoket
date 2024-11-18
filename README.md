Proyecto Chat WebSocket
Este es un proyecto de chat en tiempo real desarrollado con Node.js, WebSocket y una interfaz básica HTML/CSS/JavaScript.

Funcionalidades
Conexión de múltiples usuarios a través de WebSocket.
Envío y recepción de mensajes en tiempo real.
Notificaciones cuando un usuario se conecta o desconecta del chat.
Requisitos Previos
Tener instalado Node.js en tu sistema.
Instalación y Ejecución
Clona el repositorio en tu máquina local:

bash
Copiar código
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
Instala las dependencias del proyecto:

bash
Copiar código
npm install
Asegúrate de tener instalado el paquete ws (WebSocket):

bash
Copiar código
npm install ws
Inicia el servidor:

bash
Copiar código
node server.js
Abre el navegador y accede a:

arduino
Copiar código
http://localhost:3000
Estructura del Proyecto
server.js: Configura el servidor HTTP y WebSocket para gestionar las conexiones y los mensajes.
client.js: Lógica del cliente para interactuar con el servidor y manejar la interfaz del chat.
public/: Contiene los archivos HTML, CSS y JS necesarios para el cliente.
Captura de Pantalla
Incluye una captura del chat funcionando:
