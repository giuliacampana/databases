var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        res.send(data);
      });
    },
    post: function (req, res) {
      models.messages.post(req.body, res);
      res.send(req.body);
    }
  }

  // users: {
  //   // Ditto as above
  //   get: function (req, res) {},
  //   post: function (req, res) {}
  // },
};

