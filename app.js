'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const usersCtrl = require('./app/users');


// Define the port to run on
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const path = require('path');

app.use(express.static(__dirname + '/public'));


const webhookCtrl = require('./app/webhook');
app.get('/webhook/', webhookCtrl.getWebhook);
app.post('/webhook/', webhookCtrl.postWebhook);
app.get('/sendtoall', webhookCtrl.sendToAll);


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
      var user_refs = list;
      console.log("user_refs length: " + user_refs.length);
      webhookCtrl.init(user_refs);

  });
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