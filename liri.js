require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");
const keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var userFunction = process.argv[2];
var userInput = process.argv.slice(3).join('+');

function myTweets() {
    var params = {screen_name: 'Monarch7Project'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i=0; i < tweets.length; i++) {
                j = i+1;
                console.log("Tweet #" + j + ": " + tweets[i].text);
            }
        }
    });
}

function spotifyThis() {
    if (userInput != '') {
        spotify.search({ type: 'track', query: userInput }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
    searchArtists = data.tracks.items[0].album.artists;
    allArtists = [];

    for (var i = 0; i < searchArtists.length; i++) {
        allArtists.push(searchArtists[i].name);
    }

    var artists = allArtists.join(", ");
    
      console.log("Artist(s): " + artists);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
      console.log("Album Name: " + data.tracks.items[0].album.name);

    });

    }

    else if (process.argv.length === 3) {
        spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
        searchArtists = data.tracks.items[5].album.artists;
        allArtists = [];

        for (var i = 0; i < searchArtists.length; i++) {
            allArtists.push(searchArtists[i].name);
        }

        var artists = allArtists.join(", ")
        
        console.log("Artist(s): " + artists);
        console.log("Song: " + data.tracks.items[5].name);
        console.log("Spotify Preview URL: " + data.tracks.items[5].preview_url);
        console.log("Album Name: " + data.tracks.items[5].album.name);
        });
    }

}

function movieThis() {
    if (userInput != '') {
        var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
          
              console.log("Title: " + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
              console.log("Country where move was produced: " + JSON.parse(body).Country);
              console.log("Language of the movie: " + JSON.parse(body).Language);
              console.log("Plot of the movie: " + + JSON.parse(body).Plot)
              console.log("Actors in the movie: " + JSON.parse(body).Actors)
            }
        });
    }

    else if (userInput === '') {
        var queryUrl = "http://www.omdbapi.com/?t=" + "Mr.+Nobody" + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
          
              console.log("Title: " + JSON.parse(body).Title);
              console.log("Release Year: " + JSON.parse(body).Year);
              console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
              console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
              console.log("Country where move was produced: " + JSON.parse(body).Country);
              console.log("Language of the movie: " + JSON.parse(body).Language);
              console.log("Plot of the movie: " + + JSON.parse(body).Plot)
              console.log("Actors in the movie: " + JSON.parse(body).Actors)
            }
          });
    }
}

if (userFunction === 'movie-this') {
    movieThis();
}

else if (userFunction === 'my-tweets') {
    myTweets();
}

else if (userFunction === 'spotify-this-song') {
    spotifyThis();
}

else if (userFunction === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, info) {

        if (error) {
          return console.log(error);
        }

        var dataArr = info.split(",");
        var newQuery = dataArr[1];
      
        spotify.search({ type: 'track', query: newQuery }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
    searchArtists = data.tracks.items[0].album.artists;
    allArtists = [];

    for (var i = 0; i < searchArtists.length; i++) {
        allArtists.push(searchArtists[i].name);
    }

    var artists = allArtists.join(", ");
    
      console.log("Artist(s): " + artists);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
      console.log("Album Name: " + data.tracks.items[0].album.name);

    });
      
      
});
}

