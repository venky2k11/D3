async function init1() {
	var width = 1200
	var height = 600
	var w = 1100
	var h = 500
	var margin = 60
	var border = 10
	var bordercolor = 'black'

	var parseDate = d3.timeParse("%Y-%m-%d");
	const data_conf = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/data/confirmed_pivot2.csv");
	data_conf.forEach(function (d) {
		d.Date = parseDate(d.Date);
	})

	var allcountries = d3.map(data_conf, function (d) { return (d.Country) }).keys()
	var allgroups = d3.map(data_conf, function (d) { return (d.DensityGroup) }).keys()

	var modelList = document.getElementById("selectButton");
	var i = 0;
	allcountries.forEach(function (d) {
		var cntry = new Option(d, i);
		modelList.options.add(cntry);
		i = i + 1;
	})

	// Function to update Chart:	
	function update(data_conf) {

		t1 = data_conf[0].Country;
		t2 = data_conf[0].Country;
		t1 = t1 + '\'s Timeline';

		// svg
		var svg = d3.select("#my_dataviz2")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("border", border);

		var borderPath = svg.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", height)
			.attr("width", width)
			.style("stroke", bordercolor)
			.style("fill", "none")
			.style("stroke-width", border);


		// create a tooltip
		var tooltip = d3.select("#my_dataviz2")
			.append("div")
			.attr("class", "tooltip1")
			.style("opacity", 0)
			.style("background-color", "white")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")

		// Tooltip functions:
		var mouseover = function (d) {
			tooltip.style("opacity", 1)
		}

		var mousemove = function (d) {

			var confcount = 0;
			var formatTime = d3.timeFormat("%B %d, %Y");

			function searchdata(indate) {
				data_conf.forEach(function (d) {
					if (formatTime(d.Date) == formatTime(indate)) {
						confcount = d.Count;
						console.log(confcount);
					};
				})
			}

			searchdata(x.invert(d3.mouse(this)[0]));

			tooltip
				.html("Total Confirmed: " + confcount + "<br>" +
					"Density Group: " + d[0].DensityGroup + "<br>" +
					"Density: " + d[0].Density + "<br>" +
					"Date: " + d[0].Date)
				.style("left", (d3.mouse(this)[0] + 200) + "px")
				.style("top", (d3.mouse(this)[1] + 2000) + "px")
		}

		var mouseleave = function (d) {
			tooltip.style("opacity", 0)
		}

		if (t2 == 'US') {
			// Annotations:
			const annotations = [
				{
					id: "map1",
					note: {
						label: "Growth slowed before raising again",
						title: "Possible start of 2nd wave",
						align: "middle", 
						wrap: 300,
						padding: 10 
					},
					connector: {
						end: "arrow"
					},
					color: ["#f70c0c"],
					x: 1025,
					y: 193,
					dy: 50,
					dx: 50
				}
			]

			const makeAnnotations = d3.annotation()
				.type(d3.annotationLabel)
				.annotations(annotations)

			svg.append("g")
				.attr("class", "annotation-group")
				.call(makeAnnotations)
		}

		// Color:
		var color = d3.scaleOrdinal()
			.domain(allgroups)
			.range(d3.schemeCategory10);

		var x = d3.scaleTime()
			.domain(d3.extent(data_conf, function (d) { return d.Date; }))
			.range([0, w]);

		// Add Y axis
		var y = d3.scaleLinear()
			.domain([0, d3.max(data_conf, function (d) { return +d.Count; })])
			.range([h, 0]);

		var g = svg.append("g")
			.attr("transform", "translate(" + margin + "," + margin + ")");

		// Create Axis:
		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + margin + "," + margin + ")")
			.call(d3.axisLeft(y));

		svg.append("g")
			.attr("class", "axis")
			.style("font", "14px times")
			.attr("transform", "translate(" + margin + "," + (h + margin) + ")")
			.call(d3.axisBottom(x));

		// SVG Chart Title
		g.append("text")
			.attr("class", "title")
			.attr("x", w / 2)
			.attr("y", 0 - (5))
			.attr("text-anchor", "middle")
			// .text("Timeline")
			.text(t1)
			.style("font-size", "24px");

		// Legend
		g.append("g")
			.attr("class", "legendOrdinal")
			.attr("transform", "translate(50,50)");

		var legendOrdinal = d3.legendColor()
			.shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
			.shapePadding(10)
			.scale(color)
			.title("Density Group (line color):");

		g.select(".legendOrdinal")
			.call(legendOrdinal);

		// Add the line
		g.append("path")
			.datum(data_conf)
			.transition()
			.duration(2000)
			.attr("fill", "none")
			// .attr("stroke", "steelblue")
			.attr("stroke", function (d) { return color(d[0].DensityGroup); })
			.attr("stroke-width", 6)
			.attr("d", d3.line()
				.x(function (d) { return x(d.Date) })
				.y(function (d) { return y(d.Count) })
			);
		g.selectAll("path").on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave);
	}

	// Initialize the Chart:
	var data_conf2 = data_conf.filter(function (d, i) { return d.Country == 'US' })
	document.getElementById("selectButton").value = 174;
	update(data_conf2)

	console.table(modelList);

	// Button Events:
	var el = document.getElementById("selectButton");
	el.onclick = function () {
		console.log(document.getElementById("selectButton").value);
		document.getElementById("my_dataviz2").innerHTML = "";
		selcntry = el.options[modelList.selectedIndex].text;
		var data_conf2 = data_conf.filter(function (d, i) { return d.Country == selcntry })
		update(data_conf2)
	}
}