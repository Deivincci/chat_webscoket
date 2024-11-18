const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  // Servir archivos estáticos
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
  } else if (req.url.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.createReadStream(path.join(__dirname, 'public', 'styles.css')).pipe(res);
  } else if (req.url.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(path.join(__dirname, 'public', 'client.js')).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Archivo no encontrado');
  }
});

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ server });

let clients = []; // Para almacenar los clientes y sus nombres

wss.on('connection', (ws) => {
  let username = null; // Al principio, no tenemos un nombre de usuario
  
  // Enviar mensaje de bienvenida al nuevo cliente
  ws.send('Bienvenido al chat!');

  // Cuando recibimos un mensaje de un cliente
  ws.on('message', (message) => {
    // Si no tenemos un nombre de usuario, lo tomamos como el nombre
    if (!username) {
      username = message; // El primer mensaje será el nombre del usuario
      clients.push({ ws, username }); // Guardamos el cliente y su nombre
      console.log(`Nuevo usuario conectado: ${username}`);

      // Notificar a todos los clientes sobre la conexión del nuevo usuario
      clients.forEach(client => {
        if (client.ws !== ws) {
          client.ws.send(`${username} se ha unido al chat.`);
        }
      });

      return;
    }

    // Si ya tenemos el nombre, el mensaje es un chat
    console.log(`Mensaje de ${username}: ${message}`);
    
    // Enviar el mensaje a todos los clientes
    clients.forEach(client => {
      if (client.ws !== ws) {
        client.ws.send(`${username}: ${message}`); // Enviamos el mensaje con el nombre de usuario
      }
    });
  });

  // Cuando el cliente se desconecta
  ws.on('close', () => {
    if (username) {
      clients = clients.filter(client => client.ws !== ws); // Eliminar cliente de la lista
      console.log(`Usuario desconectado: ${username}`);
      
      // Notificar a los demás usuarios sobre la desconexión
      clients.forEach(client => {
        client.ws.send(`${username} se ha desconectado.`);
      });
    }
  });
});

// Iniciar el servidor HTTP y WebSocket en el mismo puerto
server.listen(3000, () => {
  console.log('Servidor WebSocket y HTTP funcionando en http://localhost:3000');
});
