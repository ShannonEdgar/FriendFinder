var path = require('path');
var friendsArray = require('../data/friends.js');



module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsArray array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware

    var newScores = req.body.scores;
    var scoresArray = [];
    var match = 0;

  
    for(var i=0; i<friendsArray.length; i++){
      var totalDifference = 0;
      //compare friends
      for(var j=0; j<newScores.length; j++){
        totalDifference += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newScores[j])));
      }

      scoresArray.push(totalDifference);
    }

    //find match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[match]){
        match = i;
      }
    }

    //return match data
    var bff = friendsArray[match];
    res.json(bff);

 
    friendsArray.push(req.body);
  });
};