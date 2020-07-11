var data4 = 0;
var dataGeo = 0;
async function init4() {

	const dataGeo2 = await d3.json("https://raw.githubusercontent.com/venky2k11/D3/master/data/worldgeo.json");
	const data3 = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/data/confirmed_pivot2.csv", d3.autoType);
	const data = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/data/confirmed_latest_V2.csv", d3.autoType);

	data4 = data3;
	dataGeo = dataGeo2

	var formatTime = d3.timeFormat("%B %d, %Y");
	newDate = new Date("2020-04-22");
	var data_conf3 = data4.filter(function (d, i) { return formatTime(d.Date) == formatTime(newDate) });
	updatesvg(data_conf3);
}

updatesvg = function (data) {

	var width = 1200
	var height = 600
	var border = 10
	var bordercolor = 'black'

	// svg
	var svg = d3.select("#my_dataviz4")
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

	try {
		// Map and projection
		var projection = d3.geoMercator()
			.center([38.9637, 35.2433]) // Centered on Turkey
			.scale(160)                 // Zoom
			.translate([width / 2, height / 2]);
	} catch (error) {
		console.log(error);
	}

	var valueExtent = d3.extent(data, function (d) { return +d.Count; })
	var size = d3.scaleSqrt()
		.domain(valueExtent)
		.range([1, 50])

	// Color:
	var allgroups = d3.map(data, function (d) { return (d.DensityGroup) }).keys()
	var color = d3.scaleOrdinal()
		.domain(allgroups)
		.range(d3.schemeCategory10);

	svg.append("g")
		.attr("class", "legendOrdinal")
		.attr("transform", "translate(1050,450)");

	var legendOrdinal = d3.legendColor()
		.shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
		.shapePadding(10)
		.scale(color)
		.title("Density Group:");

	svg.select(".legendOrdinal")
		.call(legendOrdinal);

	// Annotations:
	const annotations = [
		{
			id: "map1",
			note: {
				label: "Country with higest confirmed cases ",
				title: "United States",
				align: "middle",  // try right or left
				wrap: 400,  // try something smaller to see text split in several lines
				padding: 10   // More = text lower
			},
			connector: {
				end: "arrow"
			},
			color: ["#f70c0c"],
			x: 223,
			y: 293,
			dy: 250,
			dx: 350
		}
	]

	const makeAnnotations = d3.annotation()
		.type(d3.annotationLabel)
		.annotations(annotations)

	const annotations2 = [
		{
			id: "map1",
			note: {
				label: "Country with lowest confirmed cases ",
				title: "Monaco",
				align: "middle",  // try right or left
				wrap: 400,  // try something smaller to see text split in several lines
				padding: 10   // More = text lower
			},
			connector: {
				end: "arrow"
			},
			color: ["#011c16"],
			x: 511.8933805788023,
			y: 269.1474248511836,
			dy: -100,
			dx: -60
		}
	]

	const makeAnnotations2 = d3.annotation()
		.type(d3.annotationLabel)
		.annotations(annotations2)

	// Draw Map
	svg.append("g")
		.selectAll("path")
		.data(dataGeo.features)
		.enter()
		.append("path")
		.attr("fill", "#b8b8b8")
		.attr("d", d3.geoPath()
			.projection(projection)
		)
		.style("stroke", "black")
		.style("opacity", .3)

	// create a tooltip
	var tooltip = d3.select("#my_dataviz4")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("background-color", "white")
		.style("border", "solid")
		.style("border-width", "2px")
		.style("border-radius", "5px")
		.style("padding", "5px")

	svg.append("g")
		.attr("class", "annotation-group")
		.call(makeAnnotations)

	svg.append("g")
		.attr("class", "annotation-group")
		.call(makeAnnotations2)


	// Tooltip functions:
	var mouseover = function (d) {
		tooltip.style("opacity", 1)
	}
	var mousemove = function (d) {
		tooltip
			.html("Country: " + d.Country + "<br>" +
				"Total Confirmed: " + d.Count + "<br>" +
				"Density Group: " + d.DensityGroup + "<br>" +
				"Density: " + d.Density)
			.style("left", (d3.mouse(this)[0] + 200) + "px")
			.style("top", (d3.mouse(this)[1] + 200) + "px")
	}
	var mouseleave = function (d) {
		tooltip.style("opacity", 0)
	}



	// Add circles:
	svg
		.selectAll("myCircles")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function (d) { return projection([d.Long, d.Lat])[0] })
		.attr("cy", function (d) { return projection([d.Long, d.Lat])[1] })
		.attr("r", function (d) { return size(+d.Count) })
		.attr("class", "circle")
		.style("fill", function (d) { return color(d.DensityGroup) })
		.attr("fill-opacity", .8)
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave)

}


showVal = function (val) {
	var formatTime = d3.timeFormat("%B %d, %Y");
	newDate = new Date(val);
	var data_conf3 = data4.filter(function (d, i) { return formatTime(d.Date) == formatTime(newDate) });
	document.getElementById("my_dataviz4").innerHTML = "";
	updatesvg(data_conf3);
}