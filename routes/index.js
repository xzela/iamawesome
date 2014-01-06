

// module.exports = books;

/*
 * GET home page.
 */

var db = require('mongojs').connect('face-sessions', ['sessions']);

exports.index = function (req, res) {
  console.log(req.session.cookie);
  res.render('index');
};

exports.faces = require('./faces');
