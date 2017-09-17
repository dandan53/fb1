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



// Define the port to run on
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


const path = require('path');

app.use(express.static(__dirname + '/public'));


const webhookCtrl = require('./app/webhook');
app.get('/webhook/', webhookCtrl.getWebhook);
app.post('/webhook/', webhookCtrl.postWebhook);


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
     console.log("sendtoall");
     
    var product =  req.query.product
        console.log("product: " + product)
        console.log("user_refs: " + user_refs)


    var arrayLength = user_refs.length;
    for (var i = 0; i < arrayLength; i++) {
          sendAlert(user_refs[i], token, product);
    }

      res.send("Done!")


})