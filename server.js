
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);
var nicknames = [];

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection
io.on('connection', function(socket){

 
 	console.log('user conected, id: ' + socket.id);

 	console.log(nicknames);
	
	socket.emit('listOfUsers', nicknames);

  	// Handle Message Event
  	socket.on('newUsername', function(name){

  		// console.log(name);

	  	if (nicknames.indexOf(name) != -1){
			return;
		}

		socket.nickname = name;

		nicknames.push(socket.nickname);
		
  		io.emit('newUser', socket.nickname);
  	});




 	function updateNicknames(){

		io.sockets.emit('usernames', nicknames);
	}

 	socket.on('send message', function(text){
  		//io.emit('update', text);
  		console.log(text);
		io.sockets.emit('new message', {
			msg: text, 
			nick: socket.nickname
		});
	});

	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});
});

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
