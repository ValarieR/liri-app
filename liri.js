var keys = require('./keys');
var input = process.argv[3]
var Twitter = require('twitter');
var twitClient = new Twitter(keys.twitterKeys);
var Spotify = require('node-spotify-api');
var spotClient = new Spotify(keys.spotifyKeys);

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

sspotClient.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else {
    
  }
console.log(data);
});






// `spotify-this-song`
// `movie-this`
// `do-what-it-says`
