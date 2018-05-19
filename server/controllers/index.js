var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data) {
        res.json(data);
      });
    },
    post: function (req, res) {
      models.messages.post(req.body, res);
    }
  }

  // users: {
  //   // Ditto as above
  //   get: function (req, res) {},
  //   post: function (req, res) {}
  // },
};

