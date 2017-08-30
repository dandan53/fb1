var request = require('request');

exports.sendMessage = function(userId, messageData, callback) {
    request({
        url: 'https://graph.facebook.com/v2.7/214632898947234/messages',
        qs: {access_token:"EAAaeKyMkK24BAInYdd1ODHZAcW0b9PP7mYQ2jYa3drwZAYnP4ryp2DZC5UCqeG2Ll2prg8iKCboQCxWXcYi1nazzf7xV2oSozWukgoxqZBnlFZCUZC2nD6L9bzqiPAB1PsDL9XZBpiHFTSjxFrsHwc6CqCny2ECPewqjNCuikfFPQZDZD"},
        method: 'POST',
        json: {
            recipient: {id:userId},
            message: messageData
        }
    }, function(error, response, body) {
        console.log(body);
        if (error) {
            console.log(error);
        }
        callback();
    });
}


// user_ref
function sendAlert(sender, text, token) {
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