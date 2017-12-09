console.log('starting app');

const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys.js')

var client = new Twitter(keys.twitterKeys)
var spotify = new Spotify(keys.spotifyKeys);
const command = process.argv[2];
const cmdVal = process.argv[3];

var exe = {
  twitter: (cmdVal) => {
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
    return `You have ran ${command} and ${cmdVal}`
  },
  spotify: (cmdVal) => {
    spotify.search({ type: 'track', query: cmdVal })
      .then((response) => {
        for (var i = 1; i < 5; i++) {
          console.log(response.tracks.items[i].album.name);
          console.log(response.tracks.items[i].track_number);
          console.log(response.tracks.items[i].uri);
          console.log(response.tracks.items[i].artists[0].name);
          console.log(`This Song is from the Album ${response.tracks.items[i].album.name} on track no.${response.tracks.items[i].track_number}`)
        }

      })
      .catch((err) => {
        console.log(err)
      })

  },
  ombd: (cmdVal) => {
    var queryUrl = "http://www.omdbapi.com/?t=" + cmdVal + "&y&plot=short&apikey=40e9cece";

    // http://www.omdbapi.com/?i=tt3896198&apikey=55aac5b1

    request(queryUrl, function(error, response, body) {
      console.log(response.statusCode)
      console.log(JSON.parse(body).Year);
      if (response.statusCode === '200') {
        console.log(body)
      }
      if (error) {
        console.log(`error: ${error}`);
      }
    })
  },
  whatever: () => {
    console.log(`I am doing what 'IT' says which is ${cmdVal}`)
    fs.readFile('assets/random.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data)

      arr = data.split(',')
      switch (arr[0]) {
        case "spotify-this-song":
          exe.spotify(arr[1]);
          break;
        default:
          console.log('nothing')
      }
    })
  }
}

if (command === 'my-twitter') {
  exe.twitter()
} else if (command === 'spotify-this-song') {
  exe.spotify(cmdVal)
} else if (command === 'movie-this') {
  exe.ombd(cmdVal);
} else if (command === 'do-what-it-says') {
  exe.whatever(cmdVal);
}
