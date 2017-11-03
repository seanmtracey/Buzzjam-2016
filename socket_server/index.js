require('dotenv').config();
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// server.listen(process.env.VCAP_APP_PORT || 8080);
server.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
