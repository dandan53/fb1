var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 8080);

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/a', function(req, res){
  console.log('hub.challenge11111');
res.send(__dirname);
  //res.send('hub.challenge');
   // res.send(req.query['hub.challenge']);
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
