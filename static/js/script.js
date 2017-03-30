var margin = {top: 30, right: 5, bottom: 30, left: 95},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	$SCRIPT_ROOT = {{ request.script_root|tojson|safe }};

	function generateElbow()
	{
		d3.select(".visual").html("")
		d3.select(".support").html("<div class='loader'></div>");
		$.getJSON($SCRIPT_ROOT + '/generateClusterElbow', {

		  }, function(d) {
		  	//console.log(d)
		  	createElbowGraph(d.data)
		  });
		  return false;
	}
d3.select("#elbow")
        .on("click", generateElbow);
	function getDataToShow()
	{
		d3.select(".support").html("")
		d3.select(".visual").html("<div class='loader'></div>");
	 	 var data=[];
		 $.getJSON($SCRIPT_ROOT + '/display', {
			clusters: $('input[name="kmeans"]').val(),
			sampling: $('input[name=sampling]:checked').val(),
			viz: $('input[name=viz]:checked').val()
		  }, function(d) {
		  //console.log(d)
		    if (d.scree.length > 0)
		  		createScreePlot(d.scree)
		  	createGraph(d.data, ".visual")
		  });
		  return data;
	}
d3.select("#getDataToShow")
        .on("click", getDataToShow);
	getDataToShow();

		function createElbowGraph(data)
	{console.log('createElbowGraph');

		d3.select(".support").html('');
		var ewidth = 700
		var eheight = 300
		var x = d3.scale.linear()
              .domain([0, d3.max(data, function(d) { return d.x; })])
              .range([ 0, ewidth ]);

    	var y = d3.scale.linear()
    	      .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })])
    	      .range([ eheight, 0 ]);

    	var chart = d3.select('.support')
		.append('svg:svg')
		.attr('width', ewidth + margin.right + margin.left)
		.attr('height',eheight + margin.top + margin.bottom)
		.attr('class', 'chart')

		var main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', ewidth)
		.attr('height', eheight)
		.attr('class', 'main')

		// draw the x axis
		var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

		main.append('g')
		.attr('transform', 'translate(0,' + eheight + ')')
		.attr('class', 'main axis date')
		.call(xAxis)
		.append("text")
      .attr("class", "label")
      .attr("x", ewidth)
      .attr("y", -2)
      .style("text-anchor", "end")
      .text("#Components");

		// draw the y axis
		var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');


		main.append('g')
		.attr('transform', 'translate(0,0)')
		.attr('class', 'main axis date')
		.call(yAxis)
		.append("text")
      	.attr("class", "label")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("Percentage of variance explained");

		var g = main.append("svg:g");

		/*g.selectAll(".bar")
     	.data(data)
    	.enter().append("rect")
      	.attr("class", "bar")
      	.attr("x", function(d) { return x(d.x)-25; })
      	.attr("width", 50)
      	.attr("y", function(d) { return y(d.y); })
      	.attr("height", function(d) { return eheight - y(d.y); });*/

      	g.append("text")
        .attr("x", (ewidth / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("K Means Elbow");
var valueline = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

		g.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

		g.selectAll("dot")
		  .data(data)
		  .enter().append("svg:circle")
			  .attr("cx", function (d,i) { return x(d.x); } )
			  .attr("cy", function (d) { return y(d.y); } )
			  .attr("r", 3.5);
	}

	function createScreePlot(data)
	{console.log('createScreePlot');
		d3.select(".support").html('');
		var ewidth = 600
		var eheight = 300
		var x = d3.scale.linear()
              .domain([0, d3.max(data, function(d) { return d.x; })])
              .range([ 0, ewidth ]);

    	var y = d3.scale.linear()
    	      .domain([0, d3.max(data, function(d) { return d.y; })])
    	      .range([ eheight, 0 ]);

    	var chart = d3.select('.support')
		.append('svg:svg')
		.attr('width', ewidth + margin.right + margin.left)
		.attr('height',eheight + margin.top + margin.bottom)
		.attr('class', 'chart')

		var main = chart.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
		.attr('width', ewidth)
		.attr('height', eheight)
		.attr('class', 'main')

		// draw the x axis
		var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

		main.append('g')
		.attr('transform', 'translate(0,' + eheight + ')')
		.attr('class', 'main axis date')
		.call(xAxis)
		.append("text")
      .attr("class", "label")
      .attr("x", ewidth)
      .attr("y", -2)
      .style("text-anchor", "end")
      .text("#Components");

		// draw the y axis
		var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');


		main.append('g')
		.attr('transform', 'translate(0,0)')
		.attr('class', 'main axis date')
		.call(yAxis)
		.append("text")
      	.attr("class", "label")
      	.attr("transform", "rotate(-90)")
      	.attr("y", 6)
      	.attr("dy", ".71em")
      	.style("text-anchor", "end")
      	.text("Eigen Value");

		var g = main.append("svg:g");

		/*g.selectAll(".bar")
     	.data(data)
    	.enter().append("rect")
      	.attr("class", "bar")
      	.attr("x", function(d) { return x(d.x)-25; })
      	.attr("width", 50)
      	.attr("y", function(d) { return y(d.y); })
      	.attr("height", function(d) { return eheight - y(d.y); });*/

      	g.append("text")
        .attr("x", (ewidth / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Scree Plot");
var valueline = d3.svg.line()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); });

		g.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

		g.selectAll("dot")
		  .data(data)
		  .enter().append("svg:circle")
			  .attr("cx", function (d,i) { return x(d.x); } )
			  .attr("cy", function (d) { return y(d.y); } )
			  .attr("r", 3.5);
	}

	function createGraph(data, eclass, text)
	{
		var graphtitle = 'PCA plot'
		var sel = $('input[name="viz"]:checked').val()
		if (sel == 1)
			graphtitle = 'MDS-Euclidean'
		else if (sel == 2)
			graphtitle = 'MDS-Cosine'
		else if (sel == 3)
			graphtitle = 'MDS-Correlation'
		else if (sel == 4)
			graphtitle = 'Isomap'
		
		d3.select(eclass).html('');
		var svg = d3.select(eclass).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//graph title
	  svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(graphtitle);

	// setup x
	var xValue = function(d) { return d.xvalue;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

	// setup y
	var yValue = function(d) { return d.yvalue;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");

	// setup fill color
	var cValue = function(d) { return d.cluster;},
    color = d3.scale.category10();

	// add the tooltip area to the webpage
	var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

	// change string (from CSV) into number format
 	data.forEach(function(d) {
    d.xvalue = +d.xvalue;
    d.yvalue = +d.yvalue;
    //console.log(d);
  });

  // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
  yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Component 1");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Component 2");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill",'blue')
      //.style("fill", function(d) { return color(cValue(d));})
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9);
          tooltip.html(d.pointname)
          		.style("background-color",'#4CAF50')
               .style("left", (d3.event.pageX + 15) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})

}
