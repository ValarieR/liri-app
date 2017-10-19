// Links keys file
var keys = require('./keys');
// Gets all input from user
var input = process.argv;
// takes the command from user input
var command = process.argv[2].toLowerCase();
// forms the other search terms into a variable
var searchWords = process.argv.splice(3);

// gets file system
var fs = require('fs');

// links the twitter info, links twitter keys
var Twitter = require('twitter');
var twitClient = new Twitter(keys.twitterKeys);

// links spotify info, and keys
var Spotify = require('node-spotify-api');
var spotClient = new Spotify(keys.spotifyKeys);

// setting up OMDB stuff
var request = require('request');

//calls the primary function of the app
doStuff();

// defines which functions to call, based on user input
function doStuff() {
  console.log("We did stuff");

  switch (command) {

    case 'my-tweets':
      console.log("my-tweets chosen");
      fetchTweets();
      break;

    case 'spotify-this-song':
      console.log("spotify-this-song chosen");
      spotifySongs();
      break;

    case 'movie-this':
      console.log("movie-this chosen");
      getMovieInfo();
      break;

    case 'do-what-it-says':
      console.log("do-what-it-says chosen");
      doTheThang();
      break;

    default:
      console.log(
        "I don't understand. Try 'my-tweets,' 'spotify-this-song,' 'movie-this,' or 'do-what-it-says'"
      );
  }
}

// `my-tweets`

function fetchTweets() {
  var params = {
    screen_name: 'GTBootCampGirl',
    count: 20
  };

  twitClient.get('statuses/user_timeline', params, function(error, tweets) {
    if (error) {
      return console.log("an error occurred: " + JSON.stringify(error));
    }

    if (tweets) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("==============================");
        console.log("\n" + tweets[i].created_at + ":");
        console.log(tweets[i].text + "\n");
        console.log("==============================");
      }
    }
  })
}

function spotifySongs() {

  spotClient.search(
    if (searchWords.length === 0) {
      searchWords = "the sign"
    }, {
      type: 'track',
      query: searchWords,
      limit: 1
    },
    function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      } else {
        var songArtist = data.artists;
        var songAlbum = data.album;
        var songTitle = data.name;
        var songLink = data.uri;

        console.log("Artist: " + JSON.stringify(songArtist));
        console.log("Album: " + songAlbum);
        console.log("Title: " + songTitle);
        console.log("Link: " + songLink);
      }

    });
}

function getMovieInfo() {
  let searchWords = searchWords.split("").join('+');

  if (searchWords.length === 0) {
    searchWords = 'mr+nobody'
  }
  var queryURL = "http://www.omdbapi.com/?t=" + searchWords +
    "&y=&plot=short&apikey=40e9cece";
  request(queryURL, function(error, response) {
    let movie = JSON.parse(response);

    console.log("Title: " + movie.Title);
    console.log("");

  })
}

function doTheThang() {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      console.log("error");
    } else {
      input = data.split(",");
      command = input[0];
      searchWords = input[1];
      doStuff();
      console.log(data);

    }
  })
}



// `spotify-this-song`
// `movie-this`
// `do-what-it-says`
