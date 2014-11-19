
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Start Server
server.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = server.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(socket){
  socket.on('send message', function(data){
    io.sockets.emit('new message', data);
  });
});

  // socket.on('new user', function(data, callback){
  // 	if (nicknames.indexof(data) != -1){
  // 		callback(false);
  // 	} else{
  // 		callback(true);
  // 		socket.nickname = data;
  // 		nicknames.push(socket.nicknames);
  // 		io.sockets.emit('usernames', nicknames);
  // 	}
  // });
  // // Handle Message Event
  // socket.on('message', function(text){
  //   io.emit('update', text);
  // });


