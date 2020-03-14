var label = d3.select(".label");
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 450,
  height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.count); });
    
// Adds the svg canvas
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("https://raw.githubusercontent.com/ChaliZhg/corona/master/data/history.json", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.count = +d.count;
  });

  setTimeout(() => {
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.count; })]);

  // Add the valueline path.
  svg.append("path")    // Add the valueline path.
    .attr("class", "line")
    .attr("d", valueline(data));

    // Add the valueline path.
  svg   // Add the valueline path.
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", function(d) {
      return x(d.date)
    })
    .attr("cy", function(d) {
      return y(d.count)
    })
    .on("mouseover", function(d,i) {
  
   label.style("transform", "translate("+ x(d.date) +"px," + (y(d.count)) +"px)")
   label.text(d.count)
  
    });
    

  // Add the X Axis
  svg.append("g")     // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")     // Add the Y Axis
    .attr("class", "y axis")
    .call(yAxis);

  }, 600);

});