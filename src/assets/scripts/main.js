
// Wait for DOM to Load
jQuery(function($) {

    // Create New Socket Connection using Socket.io and passing different variables
    var socket = io();
    var $nickForm = $('button.rename');
    var $nickError = $('nickError');
    var $nickBox = $('input#nickname');
    var $users = $('users');
    var $messageBox = $('input#messageinput');
    var $chat = $('div.messages');

    $nickForm.on('click', function(){
      console.log($nickBox.val());
      socket.emit('newUsername', $nickBox.val()); 
    });

    socket.on('newUser', function(name){
      $('div.users').append($('<p>').text(name));
    });


    $('button.rename').on('click', function(){
      socket.emit('new user', $nickBox.val());
      $nickBox.val('');
    })

    socket.on('usernames', function(data){
      var html = '';
      for(i=0; i < data.length; i++){
        html += data[i] + '<br/>'
      }
      $users.html(html);
    });


    $('button').on('click', function(){
      var text = $messageBox.val();
      socket.emit('message', text);
      socket.emit('send message', $messageBox.val());
      $messageBox.val('');
    })

    // Recieve Update Event From The Server
    socket.on('new message', function(msg){
      $chat.append('<b>' + msg.nick + ': </b>' + msg.msg + "<br/>");
    });

    socket.on('listOfUsers', function(list){
      console.log(list);
    });

});