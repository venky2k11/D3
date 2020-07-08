async function init2() {
	var width = 1200
	var height = 600
	var border = 10
	var bordercolor = 'black'


	// svg
	var svg = d3.select("#my_dataviz3")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("border", border);

	var margin = 50;

	var borderPath = svg.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("height", height)
		.attr("width", width)
		.style("stroke", bordercolor)
		.style("fill", "none")
		.style("stroke-width", border);

	const data_conf = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/confirmed_latest_V2.csv", d3.autoType);
	const data_death = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/dead_latest.csv", d3.autoType);

	sortedconf = data_conf.slice().sort((a, b) => d3.descending(a.Count, b.Count))
	var data_conf2 = sortedconf.filter(function (d, i) { return i < 10 })

	sorteddeath = data_death.slice().sort((a, b) => d3.descending(a.Count, b.Count))
	var data_death2 = sorteddeath.filter(function (d, i) { return i < 10 })


	// //Create x and y scale
	// var yScale = d3.scaleLinear().range([height, 0]);
	// var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);

	//Create category 10 scale for color
	var c10 = d3.scaleOrdinal(d3.schemeCategory10);



	var el = document.getElementById("ConfirmedButton");
	el.onclick = function () {
		console.log(data_conf2);

		var xScale = d3.scaleBand()
			.domain(data_conf2.map(function (d) { return d.Country; }))
			.range([0, width]);

		var yScale = d3.scaleLinear()
			.domain([0, d3.max(data_conf2, function (d) { return d.Count; })])
			.range([height, 0]);

		// var xAxis = d3.axisBottom(xScale);
		// var yAxis = d3.axisLeft(yScale);

		var g = svg.append("g")
			.attr("transform", "translate(" + margin + "," + margin + ")");

		//Add bars
		var bars = g.selectAll("rect")
			.data(data_conf2)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("width", xScale.bandwidth())
			.attr("fill", "steelblue")
			.attr("fill", function (d, i) {
				return c10(Math.random() * 10 * i);
			})
			.attr("y", function (d) {
				return yScale(d.Count);
			})
			.attr("x", function (d) {
				return xScale(d.Country);
			})
			.attr("height", function (d) {
				return height - yScale(d.Count);
			});

		d3.select("#my_dataviz3").append("g")
			.attr("transform", "translate(" + margin + "," + margin + ")")
			.call(d3.axisLeft(yScale));

		d3.select("#my_dataviz3").append("g")
			.attr("transform", "translate(" + margin + "," + (height + margin) + ")")
			.call(d3.axisBottom(xScale));

		// //Add X Axis
		// svg.append("g")
		// 	.attr("transform", "translate(0," + height + ")")
		// 	.call(xAxis)
		// 	.attr("class", "x axis");
		// //Add Y Axis
		// svg.append("g")
		// 	.attr("class", "y axis")
		// 	.call(yAxis);
	}

	var el = document.getElementById("DeathButton");
	el.onclick = function () {
		console.log(data_death2);
	}
}