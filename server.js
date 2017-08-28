var express = require("express");
var app = express();

// sets port 8080 to default or unless otherwise specified in the environment
app.set('port', process.env.PORT || 8080);

app.get('/', function(req, res){
    res.send('hub_challenge');
});

app.get('/a', function(req, res){
   res.send(req.query['hub.challenge']);
});

var VERIFY_TOKEN = 'EAAGoBKt8KYgBAI0cX1s3JXJsMarnEXHOLkq7VFHPZA8j5rHm8qI3XDpUrciOxozmWZCgKujvNK5p9vfJ0Y0lZCZC9ZCZBfSON3qDn6npPQ8yd38GbRcPWXKhRAWZA4YSAlsEoQarT9FqQEAZCbO9XwldWrkyvy9XQ045JHiuf9LdWQZDZD';

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token!');    
    }
  });

// Only works on 3000 regardless of what I set environment port to or how I set
// [value] in app.set('port', [value]).
// app.listen(3000);
app.listen(app.get('port'));