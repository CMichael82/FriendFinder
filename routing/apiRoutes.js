var friends = require("../app/data/friends");

module.exports = function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function (req, res) {
		friends.push(req.body);
		var currentScores = req.body.scores;
		for (var i = 0; i < friends.length; i++) {
			var totalDifference = 0;
			for (var j = 0; j < currentScores.length; j++) {
				totalDifference += Math.abs(currentScores[j] - friends[i].scores[j]);
				friends[i].difference = totalDifference;
			}
		}
		var byDiff = friends.slice(0);
		byDiff.sort(function (a, b) {
			return a.difference - b.difference;
		});
		console.log('by Difference:');
		console.log(byDiff);
		if (byDiff[0].name !== req.body.name) {
			console.log(byDiff[0]);
			res.json(byDiff[0]);
		} else {
			console.log(byDiff[1]);
			res.json(byDiff[1]);
		}
	});
};