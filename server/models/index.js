var db = require('../db');
// var prom = require('promise-mysql');
module.exports = {
  messages: {
    get: function (callback) {
      db.then(function (con) {
        con.query('SELECT * FROM messages;', function (err, data) {
          callback(data);
        });
      });
    }, 
    post: function (message, res) {
      console.log(message);
      console.log(typeof message);
      // var message = JSON.parse(data);
      var user = message.users;
      // var createdAt = message.createdAt;
      var room = message.room;
      var message = message.message;
      db.then(function (con) {
        con.query(`INSERT INTO messages (users, room, message) VALUES ('${user}', '${room}', '${message}');`, function(err, success) {
          if (err) { throw err; }
          res.end();
        });
      });
    }
  }

  // users: {
  //   // Ditto as above.
  //   get: function (callback) {
  //     dbCon.query(`SELECT name FROM users;`)
  //   },
  //   post: function () {}
  // }
};

