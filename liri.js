var keys = require('./keys');
var command = process.argv[2].toLowerCase();
var searchWords = process.argv.splice(3);

var Twitter = require('twitter');
var twitClient = new Twitter(keys.twitterKeys);

var Spotify = require('node-spotify-api');
var spotClient = new Spotify(keys.spotifyKeys);
var artistArray = [];

// `my-tweets`

function fetchTweets() {
  var params = {
    screen_name: 'GTBootCampGirl'
  } && {
    count: 20
  };

  twitClient.get('search/tweets', params, function(error, tweets) {
      if (error) {
        return console.log("an error occurred: " + JSON.stringify(error));
      }

      if (tweets) {
        for (var i = 0; i < tweets.statuses.length; i++) {
          console.log("==============================");
          console.log("\n" + tweets[i].created_at + ":");
          console.log(tweets[i].text + "\n");
          console.log("==============================");
        }
      });
  }

  spotClient.search({
    type: 'track',
    query: input,
    limit: 20
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      .request(data.artist, data.name);
      .then(function(data) {
        console.log(data);
      });
    }
  });



  // `spotify-this-song`
  // `movie-this`
  // `do-what-it-says`
