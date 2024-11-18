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
git clone https://github.com/tu_usuario/chat_webscoket.git

cd chat_webscoket

Instala las dependencias del proyecto:
npm install

Asegúrate de tener instalado el paquete ws (WebSocket):
npm install ws

Inicia el servidor:
node server.js

Abre el navegador y accede a:
http://localhost:3000

Estructura del Proyecto
server.js: Configura el servidor HTTP y WebSocket para gestionar las conexiones y los mensajes.
client.js: Lógica del cliente para interactuar con el servidor y manejar la interfaz del chat.
public/: Contiene los archivos HTML, CSS y JS necesarios para el cliente.

![Descripción de la imagen](https://github.com/Deivincci/chat_webscoket/blob/main/chat_tiempo_real.png?raw=true)

