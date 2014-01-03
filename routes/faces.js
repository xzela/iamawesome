var fs = require('fs');

var index = function (req, res) {
  var data = { session: req.session
  };
  res.render('faces', data);
};

var save = function (req, res) {
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
  if (req.method == 'POST') {
    fs.writeFile('temp.png', base64Data, 'base64', function (err) {
      if (err) throw err;
      console.log('file was saved');
      res.end('file was saved');
    });
  } else {
    res.send(404, 'failure');
  }
};

exports.index = index;
exports.save = save;
