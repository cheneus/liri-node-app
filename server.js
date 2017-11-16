console.log('starting app');

const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js')

var client = new Twitter(keys.twitterKeys)
var spotify = new Spotify(keys.spotifyKeys);
console.log(keys.twitterKeys)
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
  // 	console.log(error)
  // 	console.log(tweets)
  //  if (!error) {
  //    console.log(tweets);
  //     	fs.appendFile('random.txt', JSON.parse(tweets));
  //  }
  // console.log(tweets)
  // // console.log(response)



} else if (command === 'spotify') {
  spotify.search({ type: 'track', query: 'All the Small Things' })
    .then((response) => {
      //    for (var i = 1; i < request.length; i++) {
      //   fs.appendFile('random.txt', JSON.parse(request.items));
      // }
        console.log(response.tracks.items[1]);
        // fs.appendFile('random.txt', JSON.stringify(response));
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
