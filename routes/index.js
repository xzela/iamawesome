

// module.exports = books;

/*
 * GET home page.
 */

exports.index = function (req, res) {
  res.render('index');
};

exports.faces = require('./faces');
