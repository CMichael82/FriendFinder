//Require the data in the friends array
var friends = require("../app/data/friends");


module.exports = function (app) {

	// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});
	
	// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
	app.post("/api/friends", function (req, res) {
		friends.push(req.body);
		//compare current input to all "friends"
		var currentScores = req.body.scores;
		for (var i = 0; i < friends.length; i++) {
			var totalDifference = 0;
			for (var j = 0; j < currentScores.length; j++) {
				//determine the difference between the users results and each possible match
				totalDifference += Math.abs(currentScores[j] - friends[i].scores[j]);
				//add this difference as a property/value for each friend
				friends[i].difference = totalDifference;
			}
		}
		//sort the array by the difference values (lowest to highest)
		var byDiff = friends.slice(0);
		byDiff.sort(function (a, b) {
			return a.difference - b.difference;
		});
		// console.log('by Difference:');
		// console.log(byDiff);

		//display the "best match" by either the 1st or 2nd index (whichever is not the current user)
		if (byDiff[0].name !== req.body.name) {
			console.log(byDiff[0]);
			res.json(byDiff[0]);
		} else {
			console.log(byDiff[1]);
			res.json(byDiff[1]);
		}
	});
};