var fs = require('fs'),
    path = require('path');

var index = function (req, res) {
  var data = { session: req.session
  };
  res.render('faces', data);
};

var save = function (req, res) {
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
  if (req.method == 'POST') {
    fs.writeFile(path.join('public/images/faces', req.session.id + '.png'), base64Data, 'base64', function (err) {
      if (err) throw err;
      console.log('file was saved');
      res.end('file was saved');
    });
  } else {
    res.send(404, 'failure');
  }
};

var myface = function (req, res) {
  fs.readFile(path.join('public/images/faces', req.session.id + '.png'), function (err, file) {
    if (err) throw err;
    res.write(file, "binary");
    res.end();
  });
};

var theirface = function (req, res) {
  var sessId = req.params.id;
  fs.readFile(path.join('public/images/faces', sessId + '.png'), function (err, file) {
    if (err) throw err;
    res.write(file, "binary");
    res.end();
  });
};

exports.index = index;
exports.save = save;
exports.myface = myface;
exports.theirface = theirface;
