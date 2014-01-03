var fs = require('fs');

function index(req, res) {
  // req.session.user = "food";
  var data = {
    session: req.session
  };
  res.render('faces', data);
}

function save(req, res) {
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/,"");
  if (req.method == 'POST') {
      fs.writeFile('temp.png', base64Data, 'base64', function(err){
        if (err) throw err;
        console.log('file was saved');
        res.end('file was saved');
      });
    // var image = req.body.imgBase64;
    // console.log('sdfg');
  } else {
    res.send(404, 'failure');
  }
}

exports.index = index;
exports.save = save;
