// app.js

// proxy for CORS before URL
var access = "https://accesscontrolalloworiginall.herokuapp.com/";
var url = "http://jsr-twitter.herokuapp.com/";

// create global array
var arrayTweets = [];

// wrap get function in for loop for 7 days until=2018-xx-xx 7 times
// for loop 7 days of tweets
for (j = 9; j < 16; j++){
  var until = "until=2018-07-"+j;
  var queryString = "q=%23scottiedog&count=5&"+until;
  // WorldCup2018
  // baseball
  // wimbledon

  $.get( access + url , queryString, function(data){
    // console.log(data);
    addTweetsDOM(data);
  });

  function addTweetsDOM(data){
    var searchTweets = data.statuses;
    // console.log(searchTweets);
    var numberTweets = searchTweets.length;

    for (var i = 0; i < searchTweets.length; i++){
      var dateTweets = searchTweets[i].created_at;
      // console.log(tweetsDate);
// concatenate 7 loops to global array
      arrayTweets.push(dateTweets);
      // console.log(arrayTweets);

  // normalize dates, time of day, ignore hour minute seconds
      var d = new Date(dateTweets);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      console.log(curr_date + "-" + curr_month + "-" + curr_year);

    }

  }

}

// D3

var data = arrayTweets;

var width = 420;
var barHeight = 20;

var x = d3.scaleLinear()
    .range([0, width])

var chart = d3.select(".chart")
    .attr("width", width);

// key value pair in JSON date and number of times
var bars = d3.select(".bars")
    .selectAll("div").data(data)

bars.append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; })
.style("color", function(d) {
  return d.value;
});
