var fs = require('fs'),
    path = require('path'),
    db = require('mongojs').connect('face-sessions', ['sessions']),
    root = 'public/images/faces';

var index = function (req, res) {
  var data = [];
  db.sessions.find(function (err, faces) {
    for (var i = 0; i < faces.length; i++) {
      var temp = faces[i];
      temp.session = JSON.parse(faces[i].session);
      data.push(temp);
    }
    console.log(data);
    res.json(data);
  });
};


var up = function (req, res) {
  req.session.foobar = new Date().getTime();
  // console.log(req.session);
  // db.sessions.update();
  res.end('session updated');
};

var addface = function (req, res) {
  res.render('face', null);
};

var save = function (req, res) {
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
  var sess = req.session;
  if (req.method == 'POST') {
    fs.writeFile(path.join('public/images/faces', req.session.id + '.png'), base64Data, 'base64', function (err) {
      if (err) throw err;
      sess.hasFile = true;
      res.end('file was saved');
    });
  } else {
    res.send(404, 'failure');
  }
};

var myface = function (req, res) {
  fs.readFile(path.join('public/images/faces', req.session.id + '.png'), function (err, file) {
    if (err) {
      res.end(404, "not found");
    } else {
      res.write(file, "binary");
      res.end();
    }
  });
};

var theirface = function (req, res) {
  var sessId = req.params.id;
  fs.readFile(path.join('public/images/faces', sessId + '.png'), function (err, file) {
    if (err) {
      res.send(404, "not found");
    } else {
      res.write(file, "binary");
      res.end();
    }
  });
};

exports.index = index;
exports.up = up;
exports.addface = addface;
exports.save = save;
exports.myface = myface;
exports.theirface = theirface;
