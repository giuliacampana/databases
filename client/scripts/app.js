var app = {};

app.send = function(message) {
  $.ajax({
    url: 'http://127.0.0.1:3000/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'http://127.0.0.1:3000/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Rooms Initialized');
      var rooms = [];

      for (var i = 0; i < data.length; i++) {

        if (!rooms.includes(data.room)) {
          rooms.push(data.room);
        }
      }

      for (var j = 0; j < rooms.length; j++) {
        app.renderRoom(rooms[j]);
      }      
    },
    error: function () {
      console.error('chatterbox: Failed to fetch message');
    }
  });
};

app.refresh = function() {
  $.ajax({
    url: 'http://127.0.0.1:3000/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {      
      app.clearMessages();
      console.log(data);

      var currentRoom = $('#rooms option:selected').val();
      $('.roomOption').remove();

      app.renderRoom(currentRoom, data);
      $('#rooms').val(currentRoom);
    },
    error: function () {
      console.error('chatterbox: Failed to fetch message');
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  if (message.users.includes('%20')) {
    message.users = message.users.replace('%20', '_');
  }
  
  var $chat = $(`<div class="chat"><div class="username ${message.users}">${message.users}</div> <div class="text">${message.message}</div> <div class="roomname">${message.room}</div></div>`);
  $chat.prependTo('#chats');
};

app.renderRoom = function(room, data) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].room === room) {
      app.renderMessage(data[i]);
    }
  }
  
};


$(document).ready(function() {
  $('#createRoom').show();
  $('#newRoom').show();
  $('#submit').hide();
  $('#message').hide();
  $('#refresh').hide();
  app.fetch();

  $('#submit').on('click', function(event) {
    var message = {};
    message.message = $('#message').val();
    message.room = $('#rooms option:selected').val();
    message.users = window.location.search.substr(10);
    app.send(message);
  });
  
  $('#createRoom').on('click', function(event) {
    newRoom = $('#newRoom').val();
    $option = $(`<option value="${newRoom}">${newRoom}</option>`);
    $option.appendTo($('#rooms'));
    $('#newRoom').val('');
  });

  $('#refresh').on('click', function() {
    app.refresh();
  });

  $('#rooms').change(function() {

    if ($('#rooms option:selected').val() === 'newRoom') {
      $('#createRoom').show();
      $('#newRoom').show();
      $('#submit').hide();
      $('#message').hide();
      $('#refresh').hide();
      app.clearMessages();
    } else {
      $('#createRoom').hide();
      $('#newRoom').hide();
      $('#submit').show();
      $('#message').show();
      $('#refresh').show();
      app.clearMessages();
      app.refresh();
    }

  });

  $('body').on('click', '.chat .username', function(event) {
    $chat = $(this);
    console.log($chat);
    var username = $chat.context.innerHTML; //
    $user = $(`.${username}`);
    $user.addClass('friend');
    
  });
  
});

