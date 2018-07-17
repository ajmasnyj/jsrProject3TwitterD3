// app.js

// proxy for CORS before URL
var access = "https://accesscontrolalloworiginall.herokuapp.com/";
var url = "http://jsr-twitter.herokuapp.com/";

// create global array
var arrayTweets = [];
var until = "until=2018-07-15";
var queryString = "q=%23scottiedog&count=5&"+until;
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

console.log(arrayTweets);

// D3 test example here
// create object literal with tweets
const data = {
  '9-7-2018': 5,
  '10-7-2018': 2,
  '9-7-2018': 2,
  '14-7-2018': 5
  // 12-7-2018 2
  // 11-7-2018 6
  // 10-7-2018 1
  // 13-7-2018 4
  // 12-7-2018 1
  // 8-7-2018  2
  // 7-7-2018  3
}
// create nested array of keys and map them with values
const listData = d3.keys(data).map(d => [d, data[d]])
console.log(listData);

// D3 example
// var data = [5, 26, 10, 19, 23, 2]
// var x = d3.scaleLinear()
// .domain([0, d3.max(data)])
//     .range([0, 420]);
//
// var bars = d3.select(".bars")
//   .selectAll("div").data(data);
//
// var map = d3.select(".map")
//   .selectAll("div").data(data);
//
//
// bars.enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .text(function(d) { return d; })
// .style("color", function(d, i) {
//   return i % 2 ? "#fff" : "#aaa";
// });
//
// bars.exit().remove();

// D3 begins here
// key value pair in JSON date and number of times
var data = "jsrProject3TwitterD3/tweets.tsv";

// set margin of SVG
var margin = {top: 50, right: 50, bottom: 50, left: 50};
// set the width and height using current width and height of div
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// create SVG and append to visualization div
var svg = d3.select("#visualization").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// set up scales of data
// svg coordinates start at 0,0 in the top left corner. switch range parameters
// set ranges
var x = d3.scaleBand()
  .range([0,width]);

var y = d3.scaleLinear()
    .range([height, 0])


// d3.request(access + url + "?" + queryString, function(error, response) {
//     // Now use response to do some d3 magic
//     console.log("this is D3", response, error);
// });


// scoping
d3.tsv(data, function(error, data) {
  // format the data
data.forEach(function(d) {
  console.log(d);
  d.tweetNumber = +d.tweetNumber;
});

// create individual bars
// doamin tells D3 the range of data to expect
// x axis is mapping the dates
// y axis is number of tweets, 0 to max
  // scale the range of data in domain
  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.tweetNumber; })]);

// create the bars with SVG rectange elements
// use the x and y positions using variables above
// set width and height of bars
  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.data); })
    .attr("width", x.bandwidth())
    .attr("y", function(d) { return y(d.tweetNumber); })
    .attr("height", function(d) { return height - y(d.tweetNumber); });

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));

});


// var chart = d3.select(".chart")
//     .attr("width", width);
//
// var bars = d3.select(".bars")
//     .selectAll("div").data(data)
//
// bars.append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .text(function(d) { return d; })
// .style("color", function(d) {
//   return d.value;
// });
