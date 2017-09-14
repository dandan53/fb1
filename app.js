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






let token = "EAAGoBKt8KYgBAPLmE6Q38xwSE2O7n5lL3E6rqLhgac2wZCpkWhzi5GhZAEAKHjb1xjYTk6zq6ZAHZBcOK30V2HWUakH3ZCWJucBoahZB719DI9nOmnp9EwJMDpk000ZCGPltxXhTvycH6PjEDHFBqMtFontOpi2a6ZAZB4JfsAROreQZDZD"

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
app.get('/version', function(req, res) {
  console.log("get version - /");

  res.send("version 1")
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
    var now = new Date();
    var jsonDate = now.toJSON();
    console.log("post - webhook: " + jsonDate);
    var jsn = JSON.stringify(req.body);
    console.log("webhook: " + jsn);

    // Make sure this is a page subscription
      if (req.body.object === 'page') {
          let messaging_events = req.body.entry[0].messaging;
		  
		  if (JSON.stringify(req.body).indexOf("optin") > 0)
		  {
			  let event = messaging_events[0]
			  let optin = event.optin;
			  let user_ref = optin.user_ref;
			  let ref = optin.ref;

        
        console.log("webhook - product: " + ref);


        var text = "Hi 🙂 Still looking for " + ref + " ? We have some interesting offers for you!"

        sendAlert(user_ref, ref, token, text);

		  }
		  else
		  {
			  for (let i=0; i < messaging_events.length; i++){
				let event = messaging_events[i]
				let sender = event.sender.id
				if (event.message && event.message.text){
				let text = event.message.text
        sendText(sender, "Hi")

        // sendText(sender, "Text echo: " + text.substring(0, 100))
            }
          }
		  } 
        }
        else {

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

function sendTextCheckbox(sender, text) {
  let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: token},
    method: "POST",
    json: {
      recipient: {user_ref: sender},
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
    var now = new Date();
	var jsonDate = now.toJSON();
    console.log(jsonDate +" : running!");
});



//// CHECKBOX /////

var sendAlert = function (userId, ref, token, text) {
     var messageData = buildMessageAlert(text);
    if (messageData) {

        // 1155176167884296
        sendMessage1(userId, messageData, token);
    }
}



var buildMessageAlert = function (text) {
    

        var messageData =
        {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Hi!",
            "subtitle":text,
            "default_action": {
              "type": "web_url",
              "url": "https://aws-use1a-dev-dev-fbbot.rfinfra.net/",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://aws-use1a-dev-dev-fbbot.rfinfra.net/"
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://aws-use1a-dev-dev-fbbot.rfinfra.net/",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"DEVELOPER_DEFINED_PAYLOAD"
              }              
            ]      
          }
        ]
      }
    }
}
    return messageData;

};



function sendMessage1(userId, messageData, token) {
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {user_ref:userId},
            message: messageData
        }
    }, function(error, response, body) {
        console.log(body);
        if (error) {
            console.log(error);
        }
       // callback();
    });
}








































// user_ref
function postAlert(sender, messageData, token) {
  //let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {access_token: token},
    method: "POST",
    json: {
      recipient: {user_ref: sender},
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





