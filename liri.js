
var fs = require('fs');

var keys = require("./keys.js");

var spotify = require('spotify');

var Twitter = require('twitter');

var request = require('request');

var DoThis = function () {
    
    fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }

    console.log(data);
    choice(data);

    });
}

var myTweets = function (){

var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'boomshaka_____'};
   client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
       for (var i=0; i <tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log("##########")
        console.log(tweets[i].text);
       }
     }
   });
}

var mySpotify = function (song){

 spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
        console.log('Error occurred: ' + err);
        return;
        }
 
        console.log(data); 
    });
}  

var myMovies = function (movieName){

    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece", function (error, response, body) {
    if (error){
        console.log('error:', error); 
        }
    var json = JSON.parse(body);

    // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('Title: ' + json.Title); // Print the HTML for the Google homepage. 
     console.log('Year: '  + json.Year);
      console.log('IMDB Rating: ' + json.imdbRating);
       console.log('Country:  ' + json.country);
        console.log('Language: ' + json.Language);
         console.log('Plot: ' + json.Plot);
          console.log('Actors: ' + json.Actors);
});

}


var choice = function(caseData, functionData){
    switch(caseData){
        case 'my-tweets' : myTweets();
        break;
        case 'spotify-this-song' : mySpotify(functionData);
        break;
        case 'movie-this' : myMovies(functionData);
        break;
        case 'do-what-it-says' : DoThis(functionData);
        break;
        default: console.log("LIRI doesn't know that command.")
    }
}

var userChoice = function(argOne, argTwo){
    choice(argOne, argTwo);
};

userChoice(process.argv[2], process.argv[3]);




