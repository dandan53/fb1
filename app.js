'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

var user_refs = []


const usersCtrl = require('./app/users');


//var usersCtrl = require('./app/users');

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


let hiText = "Hi 🙂 Still looking for PRODUCT? We have some interesting offers for you!"

let bdtUrl = "https://www.bestdeals.today/PRODUCT?utm_source=roundbot1&utm_medium=messenger_bot&origin=bot"

let bdt = "https://www.bestdeals.today"

//let promotionText = "Check out the best deals for PRODUCT"
let promotionText = "Check out the site"

const path = require('path');

app.use(express.static(__dirname + '/public'));


//FB
const webhookCtrl = require('./app/webhook');
app.get('/webhook/', webhookCtrl.getWebhook);
//app.post('/webhook/', webhookCtrl.postWebhook);


// Facebook
/*app.get('/webhook/', function(req, res) {
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
    console.error("get - webhook - ERROR: " + error);

}
})*/

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
			  let product = optin.ref;

        
        console.log("webhook - product: " + product);


        sendHi(user_ref, token, product)

        sendAlert(user_ref, token, product)

        addUser(user_ref)
		  }
		  else
		  {
			  for (let i=0; i < messaging_events.length; i++){
				let event = messaging_events[i]
				let sender = event.sender.id
				if (event.message && event.message.text){
				let text = event.message.text
        
        var retText = "This is an automated message but you are welcome to visit the site - https://www.bestdeals.today"

        sendText(sender, retText)

        sendGenericAlert(sender, token); 


        // sendText(sender, "Text echo: " + text.substring(0, 100))
            }
          }
		  } 
        }
        else {

        }
    res.sendStatus(200)
})


function addUser(user_ref) {

console.log("addUser. user_refs: " + user_ref);

  if (includes(user_refs, user_ref)){
        console.log("addUser - user exist: " + user_ref);
  }
  else
  {
     user_refs.push(user_ref);
     console.log("addUser - user added: " + user_ref);

     usersCtrl.addUser(user_ref);

  }
}

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

    console.log("*******************************************************************************");
    console.log("*******************************************************************************");
    console.log("*************** App started!!! - " + jsonDate + " *********************");
    console.log("*******************************************************************************");
    console.log("*******************************************************************************");

   init();

});


function init() {
  
 usersCtrl.getUsersList(function(list){
      user_refs = list;
      console.log("user_refs length: " + user_refs.length); // this is where you get the return value
  });
}


//// CHECKBOX /////

var sendHi = function (userId, token, product) {
        var text =  hiText.replace("PRODUCT", product)

 request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: token},
        method: 'POST',
        json:  {
         "recipient": {
            "user_ref":userId
          }, 
          "message": {
            "text":text
          }
        }
    }, function(error, response, body) {
        console.log(body);
        if (error) {
            console.log(error);
        }
       // callback();
  });
}


      
/*
var buildHiMessage = function (product) {
    
        var text =  hiText.replace("PRODUCT", product)

        var messageData =
        {
          "text":text
        }
        
        return messageData;

}; */

/*
curl -X POST -H "Content-Type: application/json" -d '{
  "recipient": {
    "user_ref":"UNIQUE_REF_PARAM"
  }, 
  "message": {
    "text":"hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=PAGE_ACCESS_TOKEN" 
*/

var sendAlert = function (userId, token, product) {
     var messageData = buildMessageAlert(product);
    if (messageData) {

        // 1155176167884296
        sendMessage1(userId, messageData, token);
    }
}



var buildMessageAlert = function (product) {
    
        var web_url = bdtUrl.replace("PRODUCT", product)
        var promotText = promotionText.replace("PRODUCT", product)

        var messageData =
        {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Best Deals Today",
            "image_url":"https://aws-use1a-dev-dev-fbbot.rfinfra.net/images/bdt.png",
            "default_action": {
              "type": "web_url",
              "url": web_url,
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": web_url
            },
            "buttons":[
              {
                "type":"web_url",
                "url":web_url,
                "title": promotText
              },{
                "type":"web_url",
                "url":web_url,
                "title":"Continue shopping"
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




var sendGenericAlert = function (userId, token) {
     var messageData = buildGeneralMessageAlert();
    if (messageData) {

        // 1155176167884296
        sendMessage2(userId, messageData, token);
    }
}

var buildGeneralMessageAlert = function () {
    

        var messageData =
        {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Start Making Smart Purchases!",
            "image_url":"https://aws-use1a-dev-dev-fbbot.rfinfra.net/images/bdt.png",
            "default_action": {
              "type": "web_url",
              "url": bdt,
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": bdt
            },
            "buttons":[
              {
                "type":"web_url",
                "url":bdt,
                "title": "Find More Deals"
              },{
                "type":"web_url",
                "url":bdt,
                "title":"Customer Care"
              }            
            ]      
          }
        ]
      }
    }
}
    return messageData;

};




function sendMessage2(sender, messageData, token) {
    request({
      url: "https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token: token},
        method: 'POST',
         json: {
        recipient: {id: sender},
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



//// utils ////

function includes(array, element) {
  for(var i=0; i < array.length; i++){
    if( array[i] === element){
      return true;
    }
  }
  return false;
}





////////////////////////// DEV /////////////////////////////////////

app.get('/version', function(req, res) {
  console.log("get version");

  res.send("version 3")
})


app.get('/message', function(req, res) {
    console.log("get message");

    sendHi("o2j02mihOA", token, "chair")
    sendGenericAlert(1502736089794375, token); 

    console.log("get message. user_refs: " + user_refs);

    res.send("Done!");
})


app.get('/sendtoall', function(req, res) {
     console.log("------------------------------------------------------");
     console.log("sendtoall");
     console.log("------------------------------------------------------");

     
    var product =  req.query.product
        console.log("product: " + product)
        console.log("user_refs: " + user_refs)


    var arrayLength = user_refs.length;
    for (var i = 0; i < arrayLength; i++) {
          sendAlert(user_refs[i], token, product);
    }

      res.send("Done!")


})