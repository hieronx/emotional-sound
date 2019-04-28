var osc = require('node-osc'),
    io = require('socket.io').listen(8081);

const oscClient = new osc.Client('127.0.0.1', 3335);
oscClient.send('/status', 'connected');

io.on('connection', function (socket) {
  socket.on('config', function (obj) {
    
  });
  socket.on('message', function (obj) {
    oscClient.send(obj);
    console.log('sent WS message to OSC', obj);
  });
});
