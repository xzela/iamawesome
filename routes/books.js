
var db = require("../database.js");

exports.index = function(req, res) {
  db.books.find(function(err, books) {
    var data = JSON.stringify(books);
    res.render("index", {
      appData: data
    });
  });
};

exports.all = function(req, res) {
  db.books.find(function(err, books){
    if (err) {return;}
    res.json(books);
  });
};

exports.one = function(req, res) {
  var bookId = db.ObjectId(req.params.id);
  db.books.findOne({'_id': bookId}, function(err, book){
    if (err) res.end(err);
    res.json(books);
  });
};

exports.create = function(req, res) {
  db.books.save(req.body);
  // console.log("done stuff");
  res.json(req.body);
};
