var facebookService =  require("./facebookService.js");


exports.sendAlert = function (userId, ref, token) {
     var messageData = buildMessageAlert();
    if (messageData) {

        // 1155176167884296
        facebookService.sendAlert(userId, ref, token);
    }
}


var sendWatchlistAlert = function(userId, userWatchlist, isInitAlert) {
    var messageData = buildMessage(userWatchlist, isInitAlert);
    if (messageData) {

        // 1155176167884296
        facebookService.sendMessage(userId, messageData,
            function(){console.log("AlertsService - userId: " + userId + " - msg: " + messageData);
            });
    }
};


var buildMessageAlert = function () {
    
        var messageData =
        {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to Peter\'s Hats",
            "image_url":"https://petersfancybrownhats.com/company_image.png",
            "subtitle":"We\'ve got the right hat for everyone.",
            "default_action": {
              "type": "web_url",
              "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
              "messenger_extensions": true,
              "webview_height_ratio": "tall",
              "fallback_url": "https://peterssendreceiveapp.ngrok.io/"
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersfancybrownhats.com",
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


var buildMessage = function (watchlist, isInitAlert) {
    if (watchlist && watchlist.length > 0) {
        var elements = [];

        // title
        var element =  {
            "title": "Best Deals Alert",
            "image_url": "data:image/png;base64,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",
            "subtitle": "Best Price"
        }
        elements.push(element);

        /*
        for (var j = 0; j < watchlist.length; j++) {
            var instrumentId = watchlist[j];
            var instrument = getInstrumentById(instrumentId);
            var instrumentRate = getRateById(instrumentId);
            if (instrument && instrumentRate != -1){
                element = {
                    "title": instrument.InstrumentDisplayName,
                    "image_url": instrument.Icon,
                    "subtitle": instrumentRate
                }
                elements.push(element);
            }
        }*/


         element = {
                    "title": instrument.InstrumentDisplayName,
                    "image_url": instrument.Icon,
                    "subtitle": instrumentRate
                }
                elements.push(element);

        var messageData =
        {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "list",
                    "elements": elements
                }
            }
        }

        return messageData;
    }

    return null;
};