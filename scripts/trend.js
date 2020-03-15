 
function addAxesAndLegend (svg, xAxis, yAxis, margin, chartWidth, chartHeight) {
  var legendWidth  = 250,
      legendHeight = 75;

  // clipping to make sure nothing appears behind legend
  svg.append('clipPath')
    .attr('id', 'axes-clip')
    .append('polygon')
      .attr('points', (-margin.left)                 + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + (-margin.top)                 + ' ' +
                      (chartWidth - legendWidth - 1) + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + legendHeight                  + ' ' +
                      (chartWidth + margin.right)    + ',' + (chartHeight + margin.bottom) + ' ' +
                      (-margin.left)                 + ',' + (chartHeight + margin.bottom));

  var axes = svg.append('g')
    .attr('clip-path', 'url(#axes-clip)');

  axes.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + chartHeight + ')')
    .call(xAxis);

  axes.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Infections');

  var legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (chartWidth - legendWidth-1) + ', 0)');

  legend.append('rect')
    .attr('class', 'legend-bg')
    .attr('width',  legendWidth)
    .attr('height', legendHeight);

  legend.append('rect')
    .attr('class', 'sum0')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 10);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 15)
    .text('North-Rhine-Westphalia');

  legend.append('rect')
    .attr('class', 'sum1')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 20);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 25)
    .text('Bavaria');

  legend.append('rect')
    .attr('class', 'sum2')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 30);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 35)
    .text('Baden-Württemberg');

  legend.append('rect')
    .attr('class', 'sum3')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 40);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 45)
    .text('Lower-Saxony');

  legend.append('rect')
    .attr('class', 'sum4')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 50);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 55)
    .text('Berlin');

  legend.append('rect')
    .attr('class', 'sum5')
    .attr('width',  75)
    .attr('height', 5)
    .attr('x', 10)
    .attr('y', 60);

  legend.append('text')
    .attr('x', 90)
    .attr('y', 65)
    .text('Hessen');
  // legend.append('path')
  //   .attr('class', 'median-line')
  //   .attr('d', 'M10,80L85,80');

  // legend.append('text')
  //   .attr('x', 115)
  //   .attr('y', 85)
  //   .text('Median');
}

function drawPaths (svg, data, x, y) {
  var sumArea16 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum17); })
    .y1(function (d) { return y(d.sum16); });
  var sumArea15 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum16); })
    .y1(function (d) { return y(d.sum15); });
  var sumArea14 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum15); })
    .y1(function (d) { return y(d.sum14); });
  var sumArea13 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum14); })
    .y1(function (d) { return y(d.sum13); });
  var sumArea12 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum13); })
    .y1(function (d) { return y(d.sum12); });
  var sumArea11 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum12); })
    .y1(function (d) { return y(d.sum11); });
  var sumArea10 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum11); })
    .y1(function (d) { return y(d.sum10); });
  var sumArea9 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum10); })
    .y1(function (d) { return y(d.sum9); });
  var sumArea8 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum9); })
    .y1(function (d) { return y(d.sum8); });
  var sumArea7 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum8); })
    .y1(function (d) { return y(d.sum7); });
  var sumArea6 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum7); })
    .y1(function (d) { return y(d.sum6); });
  var sumArea5 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum6); })
    .y1(function (d) { return y(d.sum5); });
  var sumArea4 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum5); })
    .y1(function (d) { return y(d.sum4); });

  var sumArea3 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum4); })
    .y1(function (d) { return y(d.sum3); });

  // var medianLine = d3.svg.line()
  //   .interpolate('basis')
  //   .x(function (d) { return x(d.date); })
  //   .y(function (d) { return y(d.sum3); });

  var sumArea2 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum3); })
    .y1(function (d) { return y(d.sum2); });

  var sumArea1 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum2); })
    .y1(function (d) { return y(d.sum1); });

  var sumArea0 = d3.svg.area()
    .interpolate('basis')
    .x (function (d) { return x(d.date) || 1; })
    .y0(function (d) { return y(d.sum1); })
    .y1(function (d) { return y(0); });

  svg.datum(data);

  svg.append('path')
    .attr('class', 'area sum16')
    .attr('d', sumArea16)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum15')
    .attr('d', sumArea15)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum14')
    .attr('d', sumArea14)
    .attr('clip-path', 'url(#rect-clip)');
  svg.append('path')
    .attr('class', 'area sum13')
    .attr('d', sumArea13)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum12')
    .attr('d', sumArea12)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum11')
    .attr('d', sumArea11)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum10')
    .attr('d', sumArea10)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum9')
    .attr('d', sumArea9)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum8')
    .attr('d', sumArea8)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum7')
    .attr('d', sumArea7)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum6')
    .attr('d', sumArea6)
    .attr('clip-path', 'url(#rect-clip)');
  svg.append('path')
    .attr('class', 'area sum5')
    .attr('d', sumArea5)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum4')
    .attr('d', sumArea4)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum3')
    .attr('d', sumArea3)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum2')
    .attr('d', sumArea2)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum1')
    .attr('d', sumArea1)
    .attr('clip-path', 'url(#rect-clip)');

  svg.append('path')
    .attr('class', 'area sum0')
    .attr('d', sumArea0)
    .attr('clip-path', 'url(#rect-clip)');
  // svg.append('path')
  //   .attr('class', 'median-line')
  //   .attr('d', medianLine)
  //   .attr('clip-path', 'url(#rect-clip)');
}

function addMarker (marker, svg, chartHeight, x) {
  var radius = 32,
      xPos = x(marker.date) - radius - 3,
      yPosStart = chartHeight - radius - 3,
      yPosEnd = (marker.type === 'Client' ? 80 : 160) + radius - 3;

  var markerG = svg.append('g')
    .attr('class', 'marker '+marker.type.toLowerCase())
    .attr('transform', 'translate(' + xPos + ', ' + yPosStart + ')')
    .attr('opacity', 0);

  markerG.transition()
    .duration(1000)
    .attr('transform', 'translate(' + xPos + ', ' + yPosEnd + ')')
    .attr('opacity', 1);

  markerG.append('path')
    .attr('d', 'M' + radius + ',' + (chartHeight-yPosStart) + 'L' + radius + ',' + (chartHeight-yPosStart))
    .transition()
      .duration(1000)
      .attr('d', 'M' + radius + ',' + (chartHeight-yPosEnd) + 'L' + radius + ',' + (radius*2));

  markerG.append('circle')
    .attr('class', 'marker-bg')
    .attr('cx', radius)
    .attr('cy', radius)
    .attr('r', radius);

  markerG.append('text')
    .attr('x', radius)
    .attr('y', radius*0.9)
    .text(marker.type);

  markerG.append('text')
    .attr('x', radius)
    .attr('y', radius*1.5)
    .text(marker.version);
}

function startTransitions (svg, chartWidth, chartHeight, rectClip, markers, x) {
  rectClip.transition()
    .duration(1000*markers.length)
    .attr('width', chartWidth);

  markers.forEach(function (marker, i) {
    setTimeout(function () {
      addMarker(marker, svg, chartHeight, x);
    }, 1000 + 500*i);
  });
}

function makeChart (data, markers) {
  var svgWidth  = 450,
      svgHeight = 300,
      margin = { top: 20, right: 20, bottom: 40, left: 60 },
      chartWidth  = svgWidth  - margin.left - margin.right,
      chartHeight = svgHeight - margin.top  - margin.bottom;

  var x = d3.time.scale().range([0, chartWidth])
            .domain(d3.extent(data, function (d) { return d.date; })),
      y = d3.scale.linear().range([chartHeight, 0])
            .domain([0, d3.max(data, function (d) { return d.sum17; })]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(15).tickFormat(d3.time.format("%d"))
                .innerTickSize(-chartHeight).outerTickSize(0).tickPadding(10),
      yAxis = d3.svg.axis().scale(y).orient('left')
                .innerTickSize(-chartWidth).outerTickSize(0).tickPadding(10);

  var svg = d3.select('#my_dataviz').append('svg')
    .attr('width',  svgWidth)
    .attr('height', svgHeight)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // clipping to start chart hidden and slide it in later
  var rectClip = svg.append('clipPath')
    .attr('id', 'rect-clip')
    .append('rect')
      .attr('width', 0)
      .attr('height', chartHeight);

  addAxesAndLegend(svg, xAxis, yAxis, margin, chartWidth, chartHeight);
  drawPaths(svg, data, x, y);
  startTransitions(svg, chartWidth, chartHeight, rectClip, markers, x);
}

var parseDate  = d3.time.format('%Y-%m-%d').parse;
d3.json('https://gist.githubusercontent.com/ChaliZhg/afff054c4e46e1ae1caf62a3e59e6df4/raw/c776a6c941a4461e39d1e5625f1be06baabd2acb/csvjson.json', function (error, rawData) {
  if (error) {
    console.error(error);
    return;
  }

  var data = rawData.map(function (d) {
    return {
      date:  parseDate(d.date),
      sum1: d["North-Rhine-Westphalia"],
      sum2: d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum3: d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum4: d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum5: d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum6: d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum7: d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum8: d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum9: d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum10: d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum11: d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum12: d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum13: d["Thuringia"]+d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum14: d["Mecklenburg-Vorpommern"]+d["Thuringia"]+d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum15: d["Saxony-Anhalt"]+d["Mecklenburg-Vorpommern"]+d["Thuringia"]+d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum16: d["Saarland"]+d["Saxony-Anhalt"]+d["Mecklenburg-Vorpommern"]+d["Thuringia"]+d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
      sum17: d["Germany-repatriated"]+d["Saarland"]+d["Saxony-Anhalt"]+d["Mecklenburg-Vorpommern"]+d["Thuringia"]+d["Bremen"]+d["Schleswig-Holstein"]+d["Brandenburg"]+d["Saxony"]+d["Rhineland-Palatinate"]+d["Hamburg"]+d["Hesse"]+d["Berlin"]+d["Lower-Saxony"]+d["Baden-Württemberg"]+d["Bavaria"]+d["North-Rhine-Westphalia"],
    };
  });

  d3.json('https://gist.githubusercontent.com/ChaliZhg/cbe5644eb8ac66e5608b46a2f9136583/raw/d30bb0885882e8ff06370b6dfadf9e8e6fb95168/markers.json', function (error, markerData) {
    if (error) {
      console.error(error);
      return;
    }

    var markers = markerData.map(function (marker) {
      return {
        date: parseDate(marker.date),
        type: marker.type,
        version: marker.version
      };
    });

    makeChart(data, []);
  });
});