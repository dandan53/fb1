var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var ref = randomString(10);

var getRef = function() {
  return ref;
}

var myFunction = function() {
  //var ref = randomString(10);
  document.getElementById("fbcb").setAttribute("user_ref", ref);
}
