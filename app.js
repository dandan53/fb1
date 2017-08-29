'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();


//logs
/*var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};*/






let token = "EAAGoBKt8KYgBAOJGhVI8XZCC3kMt2QfEWIcQIXiMl6eGrxr4GxxWBLPPJSK2YbjDaEgfehR8zx4aWY7ErsZBFSaak7EDMIxE1Vco7RpYz1KEFoXS46uqTCT0fqaLRZCnvexPKGc07PKcb3PUOaaqMeCIsctxqTzNb7kWxsl5QZDZD"

// Define the port to run on
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())





/// HTML

const path = require('path');


//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
//app.use('/public', express.static(path.join(__dirname + '/public')));


// ROUTES
/*app.get('/', function(req, res) {
  console.log("get - /");

  res.send("Hi I am a bit")
})*/

//TEST
app.get('/test', function(req, res) {
  console.log("get - /");

  res.send("Hi I am a bit")
})


// Facebook
app.get('/webhook/', function(req, res) {
  try {

  console.log("get - webhook");

    //TEMP
    res.send(req.query['hub.challenge']);

    if (req.query['hub.challenge'] === "dan"){
      res.send(req.query['hub.challenge']);
    }
    res.send("wrong token")

  }
  catch (error) {
    console.log("get - webhook - ERROR");

}
})

app.post('/webhook/', function(req, res) {
    console.log("post - webhook");

    let messaging_events = req.body.entry[0].messaging
    for (let i=0; i < messaging_events.length; i++){
      let event = messaging_events[i]
      let sender = event.sender.id
      if (event.message && event.message.text){
        let text = event.message.text
        sendText(sender, "Text echo: " + text.substring(0, 100))
      }
    }
    res.sendStatus(200)
})

function sendText(sender, text) {
  let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: token},
    method: "POST",
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function(error, response, body){
      if (error){
        console.log("sending error");
      } else if (response.body.error){
        console.log("response body error");
    }
  })
}



app.listen(app.get('port'), function() {
  console.log('running!!!');
});
