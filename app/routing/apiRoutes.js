var buddies = require("../data/buddies");

module.exports = function(app) {
  // Return all buddies found in buddies.js as JSON
  app.get("/api/buddies", function(req, res) {
    res.json(buddies);
  });

  app.post("/api/buddies", function(req, res) {
    console.log(req.body.scores);

    // Receive user details
    var user = req.body;

    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    var bestBuddiesIndex = 0;
    var minimumDifference = 40;

    for(var i = 0; i < buddies.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < buddies[i].scores; j++) {
        var difference = Math.abs(user.scores[j] - buddies[i].scores[j]);
        totalDifference += difference;
      }
      // if there is a new minimum, change the best buddies index and set the new minimum for next iteration comparisons
      if(totalDifference < minimumDifference) {
        bestBuddiesIndex = i;
        minimumDifference = totalDifference;
      }
    }
    // after finding match, adding user to buddies array
    buddies.push(user);

    // sending back to browser the best buddies match
    res.json(buddies[bestBuddiesIndex]);
  });
};