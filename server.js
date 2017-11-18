console.log('starting app');

const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js')

var client = new Twitter(keys.twitterKeys)
var spotify = new Spotify(keys.spotifyKeys);
const command = process.argv[2];

if (command === 'twitter') {

  // var params = {screen_name: 'nodejs'};
  var params = { count: 22 }
  client.get('statuses/home_timeline/', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 1; i < tweets.length; i++) {
        console.log(`${i}).  ${tweets[i].text}`)
      }

    } else {
      console.log(error)
    }
  });
  // var params = {user_id:	882801866731655168};
  // client.get('statuses/user_timeline',params , function(error, tweets, response) {

} else if (command === 'spotify') {
  spotify.search({ type: 'track', query: 'All the Small Things' })
    .then((response) => {
      for (var i = 1; i < 5; i++) {
        console.log(response.tracks.items[i].album.name);
        console.log(response.tracks.items[i].track_number);
        console.log(response.tracks.items[i].uri);
        console.log(response.tracks.items[i].artists[0].name);
        console.log(`This Song is from the Album ${response.tracks.items[i].album.name} on track no.${response.tracks.items[i].track_number}`)
      }
      //   fs.appendFile('random.txt', JSON.parse(request.items));
      // }
      // console.log(response.tracks.items[1]);

      fs.appendFile('random.txt', JSON.stringify(response));
    })
    .catch((err) => {
      console.log(err)
    })

  // Do something with 'data' 

} else if (command === 'ombd') {
  let movieName = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y&plot=short&apikey=40e9cece";

  // http://www.omdbapi.com/?i=tt3896198&apikey=55aac5b1

  request(queryUrl, function(error, response, body) {
    console.log(response.statusCode)
    console.log(JSON.parse(body).Year);
    if (response.statusCode === '200') {
      console.log(body)

    }
    if (error) {
      console.log('error:', error);
    }
  })

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);
}
