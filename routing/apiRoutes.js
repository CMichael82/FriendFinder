var friends = require("../app/data/friends");

module.exports = function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friends);
	});

	app.post("/api/friends", function (req, res) {
		friends.push(req.body);
		res.json(true);
		var currentScores = req.body.scores;
		var difference;
		console.log(currentScores);
		for (var i = 0; i < friends.length; i++) {
			
			console.log(friends[i].scores);
			// for (var j = 0; j<friends[i].scores.length; j++){
			// 	console.log(friends.scores[j]);
			// }
			
		}
	});
};