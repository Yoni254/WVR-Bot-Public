require('newrelic')
var express = require('express')
var app = express()
const port = process.env.PORT || 3000;      //new const to port to heroku
app.use(express.static(__dirname))
app.get('/', function(req, res) {
    console.log("someone Entered the site");
    res.render("index.html")  
})
app.listen(port, function() {
    console.log("App running at " + port); 
})