var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      // dbCon.query(`SELECT room, message, createdAt FROM messages INNER JOIN users name ON users.user_id = messages.user_id;`, function(err, data) {
      //   if(err) throw err;
      //   callback(data);
      // });
      dbCon.query('SELECT * FROM messages;', function (err, data) {
        callback(data);
      });
    }, 
    post: function (message, res) {
      var user = message.user;
      var createdAt = message.createdAt;
      var room = message.room;
      var message = message.message;
      // dbCon.query(`INSERT INTO users (name) VALUES (${user}) INSERT INTO messages (createdAt, room, message) VALUES (${createdAt}, ${room}, ${message});` function(err, data) {
      //   if (err) throw err;
      //   res.send('message sent!');
      // })
      dbCon.query(`INSERT INTO messages (user, room, message, createdAt) VALUES (${user}, ${room}, ${message}, ${createdAt});`, function(err, success) {
        if (err) { throw err; }
        res.end();
      });
    } // a function which can be used to insert a message into the database
  }

  // users: {
  //   // Ditto as above.
  //   get: function (callback) {
  //     dbCon.query(`SELECT name FROM users;`)
  //   },
  //   post: function () {}
  // }
};

