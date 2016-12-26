var app = angular.module('currentsee');

//creating our factory which will provide the service that sets our form words, and gets them
app.factory('currentseeFactory', function(){
//creating and assigning an empty object to a variable, which will hold our search words
	var searchWords = {};
//creating the first part of the service, a function that returns the search words from form view and sets them in the object
	function setsearchWords(words) {
		searchWords = words;
		console.log("set", searchWords);
		return searchWords;
	}
//this function gets and returns the object to the results view
	function getsearchWords(words) {
		console.log("get", searchWords);
		return searchWords;
	}
//this object contains the functions used in the service		
	return {
		getsearchWords: getsearchWords,
		setsearchWords: setsearchWords
	}

});