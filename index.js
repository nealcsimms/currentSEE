//use express
var express = require('express');
var app = express();
//use twitter
twit = require('twitter'),
	twitter = new twit({
		consumer_key: 'e4dPlJrNlpJFCjPkfB6YLegz3',
		consumer_secret: '0ChN1PSoJA8cEcZJP1RLoACD0HnGHo45ToK0PODCECKfRITPlb',
		access_token_key: '806166248212103169-K0dwcQu4FGg55cVIVTXo6wamB2yqs7O',
		access_token_secret: '8qkRhWUcXFlp03FdB3UP3I6BYJIcny3YTQ5Y8IDTRxn4u'
	});

//routes our data to the public folder
app.use(express.static(__dirname + '/public'))

//this is a route for our twitter api
app.get('/tweets', function(req, res){
    //setting variable with our search params
    var searchquery = req.query.name + ' ' + req.query.city;
    console.log("working");
    twitter.get('search/tweets', {q: searchquery, count: 6}, function(error, tweets, response) {
        console.log("it works");        //if no errors, send our tweets to our
       //if there are no errors send tweets
        if (!error) {
            res.send(tweets);
        }
       //if errors send error message 
        else{
            res.send(error);
        }
    });
});

//sets our node.js server
var server = app.listen(process.env.PORT || 3000, function () {
var port = server.address().port;
console.log('Example app listening at http://localhost:%s', port);
});
