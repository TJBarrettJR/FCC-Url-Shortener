// server.js
// where your node app starts
var express = require('express');
var app = express();
var validUrl = require("valid-url");
var mongoClient = require("mongodb").MongoClient;

app.get("/", function(req, res) {
  res.sendFile('index.html', {root: "views"});
});

mongoClient.connect(process.env.dbconnect, function(err, db){
  if (err) {
    throw err;
  } else { 
    console.log("Connected to database");

    app.get("/:id", function (request, response) {
      db.collection("urls").find({"id": request.params.id}, {"url": 1, "_id": 0}).toArray(function(err, record) {
        if (record[0]) {
        response.redirect(record[0]["url"]);
      } else {
        response.status(404).end("Url not found.");
      }
      });
    });
    
    app.get("/new/:url*", function(request, response) {
      console.log("got request");
      var url = request.params.url + request.params[0];
      if (!validUrl.isUri(url)) {
         response.status(400).end("Not a valid URL"); 
      }
      db.collection("urls").find({"url": url}, {"id": 1, "url": 1, "_id": 0}).toArray(function(err, record) {
        if (record[0]) {
          response.json(convertJSON(record));
        } else {                                       
          db.collection("urls").find({}, {sort: {"id": -1}, "limit": 1, "fields": {"id": 1, "_id": 0}}).toArray(function(err, lastID){
            var idToUse = 0; 
            if (lastID[0]) {
              idToUse = +lastID[0]["id"] + 1;
            }
            db.collection("urls").insert({"id": idToUse, "url": url}, function(err, result) {
              db.collection("urls").find({"id": idToUse}, {"id": 1, "url": 1, "_id": 0}).toArray(function(err, doc) {
                response.json(convertJSON(doc));
              });
            });
          });
        }
      });
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function convertJSON(input) {
  return {"original_url": input[0]["url"], "short_url": "https://lead-toast.glitch.me/" + input[0]["id"]};
}