require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var input = process.argv;
var action = input[2];
var inputs = input[3];
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var figlet = require("figlet");
var colors = require("colors");

figlet("LIRI BOT", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data.red);
});

switch (action) {
  case "spotify-this-song":
    spotifyThat(inputs);
    break;
  case "movie-this":
    ombdThat(inputs);
    break;
  case "concert-this":
    concertThat(inputs);
    break;
  case "do-what-it-says":
    doThat();
    break; 
}

function spotifyThat(inputs) {
  if (!inputs) {
    inputs = "the sign ace of base";
  }
  spotify.search({ type: "track", query: inputs }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var songInfo = data.tracks.items;
    console.log(
      "============================================================================================================"
        .blue
    );
    console.log("Artist(s): ".yellow + songInfo[0].artists[0].name);
    console.log("Song Name: ".yellow + songInfo[0].name);
    console.log("Preview Link: ".yellow + songInfo[0].preview_url);
    console.log("Album: ".yellow + songInfo[0].album.name);
    console.log(
      "============================================================================================================"
        .blue
    );
  });
}

function ombdThat(inputs) {
  if (!inputs) {
    inputs = "Mr. Nobody";
  }
  const queryUrl =
    "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=3fb219a7";

  axios.get(queryUrl).then(function(response, err) {
    console.log(
      "============================================================================================================"
        .blue
    );
    console.log("Title: ".yellow, response.data.Title);
    console.log("Year: ".yellow, response.data.Year);
    console.log("Rated: ".yellow, response.data.Rated);
    console.log("IMDB Rating: ".yellow, response.data.imbdRating);
    console.log("Country: ".yellow, response.data.Country);
    console.log("Language: ".yellow, response.data.Language);
    console.log("Plot: ".yellow, response.data.Plot);
    console.log("Actors: ".yellow, response.data.Actors);
    console.log(
      "============================================================================================================"
        .blue
    );
    if (err) {
      return console.log("Error occurred: " + err);
    }
  });
}

function concertThat(inputs) {
  if (!inputs) {
    inputs = "Drake";
  }
  var bandCamp =
    "https://rest.bandsintown.com/artists/" +
    inputs +
    "/events?app_id=codingbootcamp";
  axios.get(bandCamp).then(function(response, err) {
    console.log("=============================================".blue);
    console.log("Venue Name: ".yellow + response.data[0].venue.name);
    console.log(
      "Venue Location: ".yellow +
        response.data[0].venue.region +
        ", " +
        response.data[0].venue.country
    );
    var a = moment(response.data[0].datetime).format("MM/DD/YYYY");
    var b = moment(response.data[0].datetime).format("hh:mm a");
    console.log("Date & Event Time: ".yellow + a.red + " " + b.red);
    console.log("=============================================".blue);
    if (err) {
      return console.log("Error occurred: " + err);
    }
  });
}

function doThat(inputs){
  fs.readFile('random.txt', 'utf8', function(err, data){
    if(err) {
      return console.log("Error occured " + err);
    }

    var txtRandom = data.split(",");
    console.log(txtRandom);
    console.log(data);

    if (txtRandom === txtRandom) {
    var playList = txtRandom[1].slice(1, -1);
    spotifyThat(playList);
    console.log(playList);
    } else {
      console.log("whatttttt");
    }

  })
}


