
exports.addUser = function (user_ref) {
    console.log("addUserToDB. user_ref: " + user_ref);
    
    db.users.insert({"user_ref": user_ref}, function(err, doc) {
                console.log("addUserToDB. doc: " + JSON.stringify(doc));
            });
};

exports.getUsersList = function (callback) {
    db.users.find(function (err, docs) {
                console.log("getUsersList. doc: " + JSON.stringify(docs));
        var retVal = [];
        if (docs != null)
        {
            for (var i = 0; i < docs.length; i++) {
                retVal.push(docs[i].user_ref);
            }
        }
        console.log("getUsersList - retVal: " + JSON.stringify(retVal));
        callback(retVal);
    });
};



/*

exports.notifyAll = function (req, res, next) {
    dbRegistration.registration.find(function (err, docs) {
        var retVal = [];
        if (docs != null)
        {
            for (i = 0; i < docs.length; i++) {
                retVal.push(docs[i].registrationId);
            }
        }
        registrations = retVal;
        log.info("notifyall: " + JSON.stringify(registrations));
        console.log("notifyall: " + JSON.stringify(registrations));
        sendMessageToAll(req.body);
        res.json("OK");
    });
};


var sendMessageToAll = function(event){

    var msgText = event.name + " - " +
        dateFormat(event.date, "dddd, mmmm dS, yyyy") + " "
        + dateFormat(event.start, "HH:mm");

    var message = new gcm.Message({
        data: { message: msgText, title: "New event!", inapp: event}
    });
    message.addNotification('title', 'Alert!!!');

// Set up the sender with you API key, prepare your recipients' registration tokens.
    var sender = new gcm.Sender(GOOGLE_API_KEY);
    var regTokens = registrations;

    log.info("sendMessageToAll - registrations: " + registrations);
    console.log("sendMessageToAll - registrations: " + registrations);

    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if(err){
            log.info("sendMessageToAll - ERROR: " + err);
            console.error(err);
        }
        else{
            log.info("sendMessageToAll: " + response);
            console.log(response);
        }
    });
};

exports.getRegistrations = function (req, res, next) {
    dbRegistration.registration.find(function (err, docs) {
        console.log(docs);
        log.info("Registrations - GET: " + JSON.stringify(docs));
        res.json(docs);
    });
};

exports.getRegistrationsList = function (req, res, next) {
    dbRegistration.registration.find(function (err, docs) {
        log.info("registrationsList - GET: " + docs);
        var retVal = [];
        if (docs != null)
        {
            for (i = 0; i < docs.length; i++) {
                retVal.push(docs[i].registrationId);
            }
        }
        log.info("getRegistrations - retVal: " + JSON.stringify(retVal));
        console.log("getRegistrations - retVal: " + JSON.stringify(retVal));
        registrations = retVal;
        res.json(retVal);
    });
};



exports.register = function (req, res) {
    log.info("registration - POST, Request: " + JSON.stringify(req.body));
    console.log("registration - POST, Request: " + JSON.stringify(req.body));

    var deviceId = req.body.deviceId;
    dbRegistration.registration.remove({deviceId: deviceId}, function (err, doc) {
        var register = function(event)
        {
            dbRegistration.registration.insert(req.body, function(err, doc) {
                log.info("registration - register, doc: " + JSON.stringify(doc));
                console.log("registration - register, doc: " + JSON.stringify(doc));
                res.json(doc);
            });
        };
        register();
    });
};

exports.removeAllRegistrations = function (req, res, next) {
    log.info("/registration/removeall");
    console.log("/registration/removeall");
    dbRegistration.registration.remove(function(err, doc) {
        log.info("/registration/removeall - doc: " + JSON.stringify(doc));
        res.json(doc);
    });
};

var getRegistrationsFromDB = function() {
    dbRegistration.registration.find(function (err, docs) {
        log.info("getRegistrations - docs: " + JSON.stringify(docs));
        console.log("getRegistrations - docs: " + JSON.stringify(docs));
        var retVal = [];
        if (docs != null)
        {
            for (i = 0; i < docs.length; i++) {
                retVal.push(docs[i].registrationId);
            }
        }
        log.info("getRegistrations - retVal: " + JSON.stringify(retVal));
        console.log("getRegistrations - retVal: " + JSON.stringify(retVal));

        data = retVal;
        done = true;

        ret = retVal;
        //return retVal;
    });
};

*/