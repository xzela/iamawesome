
var db = require("../database.js");


exports.all = function(req, res) {
  db.books.find(function(err, books){
    if (err) {return;}
    var json = {
      books: books
    };
    res.json(json);
  });
};

exports.one = function(req, res) {
  var bookId = db.ObjectId(req.params.id);
  db.books.findOne({'_id': bookId}, function(err, book){
    if (err) res.end(err);
    var json = {
      book: book
    };
    res.json(json);
  });
};
