//dependencies//
var express = require ("express");
var path = require("path");
var app = express();

//setup a port//
var PORT = process.env.PORT || 8080;

//middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

//Routes//
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//start the server//
app.listen(PORT, function(){
	console.log("You are listening on " + PORT);
});