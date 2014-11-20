
// Wait for DOM to Load
jQuery(function($) {

    // Create New Socket Connection using Socket.io
    var socket = io();
    var $nickForm = $('setNick');
    var $nickError = $('nickError');
    var $nickBox = $('input#nickname');
    var $users = $('users');
    var $messageBox = $('input#messageinput');
    var $chat = $('div.messages');

    $nickForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user', $nickBox.val());
         // function(data){
          // if(data){
          //   $('nickWrap').hide();
          //   $('contentWrap').show();
          // } else{
          //   $nickError.html('That username is already taken!  Try again.');
          // }
        
        
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

});