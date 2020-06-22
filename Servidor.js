net = require('net');

var clientes = [];

net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  clientes.push(socket);

  socket.write("Bienvenido " + socket.name + "\n");
  broadcast(socket.name + " seacaba de unir\n", socket);

  
  socket.on('data', function (data) {
    
    broadcast(socket.name + ">" + data, socket);
  
    });

  socket.on('end', function () {
    
    clientes.splice(clientes.indexOf(socket), 1);
    broadcast(socket.name + " abandono la sala\n");
  
    });
  
  
  function broadcast(mensaje, sender) {
    
    clientes.forEach(function (cliente) {
      
      if (cliente === sender) return;
      cliente.write(mensaje);
      
    });
    process.stdout.write(mensaje)
  
    }

}).listen(5000);

console.log("Servidor iniciado en el puerto 5000\n");