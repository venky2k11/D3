async function init2() {
	var width = 1200
	var height = 600
	var w = 1100
	var h = 500
	var margin = 60
	var border = 10
	var bordercolor = 'black'

	const data_conf = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/data/confirmed_latest_V2.csv", d3.autoType);
	const data_death = await d3.csv("https://raw.githubusercontent.com/venky2k11/D3/master/data/dead_latest.csv", d3.autoType);

	sortedconf = data_conf.slice().sort((a, b) => d3.descending(a.Count, b.Count))
	var data_conf2 = sortedconf.filter(function (d, i) { return i < 10 })

	sorteddeath = data_death.slice().sort((a, b) => d3.descending(a.Count, b.Count))
	var data_death2 = sorteddeath.filter(function (d, i) { return i < 10 })

	function update(casetype, selectedVar, selectedVar2) {

		// svg
		var svg = d3.select("#my_dataviz3")
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
		var tooltip = d3.select("#my_dataviz3")
			.append("div")
			.attr("class", "tooltip2")
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

		if (casetype == 'death') {
			var mousemove = function (d) {
				tooltip
					.html("Country: " + d.Country + "<br>" +
						"Total Deaths: " + d.Count + "<br>" +
						"Density Group: " + d.DensityGroup + "<br>" +
						"Density: " + d.Density)
					.style("left", (d3.mouse(this)[0] + 350) + "px")
					.style("top", (d3.mouse(this)[1] + 1050) + "px")
			}
		} else {
			var mousemove = function (d) {
				tooltip
					.html("Country: " + d.Country + "<br>" +
						"Total Confirmed: " + d.Count + "<br>" +
						"Density Group: " + d.DensityGroup + "<br>" +
						"Density: " + d.Density)
					.style("left", (d3.mouse(this)[0] + 350) + "px")
					.style("top", (d3.mouse(this)[1] + 1050) + "px")
			}
		}

		var mouseleave = function (d) {
			tooltip.style("opacity", 0)
		}

		// Color:
		var allgroups = d3.map(selectedVar, function (d) { return (d.DensityGroup) }).keys()
		var color = d3.scaleOrdinal()
			.domain(allgroups)
			.range(d3.schemeCategory10);

		var x = d3.scaleBand().domain(selectedVar2.map(function (d) { return d.Country; })).range([0, w]).padding(0.1);
		var y = d3.scaleLinear().domain([0, d3.max(selectedVar2, function (d) { return d.Count; })]).range([h, 0]);

		var g = svg.append("g")
			.attr("transform", "translate(" + margin + "," + margin + ")");

		svg.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(" + margin + "," + margin + ")")
			.call(d3.axisLeft(y));

		svg.append("g")
			.attr("class", "axis")
			.style("font", "14px times")
			.attr("transform", "translate(" + margin + "," + (h + margin) + ")")
			.call(d3.axisBottom(x));

		if (casetype == 'death') {
			g.append("text")
				.attr("class", "title")
				.attr("x", w / 2)
				.attr("y", 0 - (5))
				.attr("text-anchor", "middle")
				.text("Death Cases")
				.style("font-size", "34px");
		} else {
			g.append("text")
				.attr("class", "title")
				.attr("x", w / 2)
				.attr("y", 0 - (5))
				.attr("text-anchor", "middle")
				.text("Confirmed Cases")
				.style("font-size", "34px");
		}


		g.append("g")
			.attr("class", "legendOrdinal")
			.attr("transform", "translate(950,50)");

		var legendOrdinal = d3.legendColor()
			.shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
			.shapePadding(10)
			.scale(color)
			.title("Density Group:");

		g.select(".legendOrdinal")
			.call(legendOrdinal);

		g.selectAll("rect")
			.data(selectedVar2)
			.enter().append("rect")
			.transition()
			.duration(1000)
			.attr("x", function (d, i) { return x(d.Country); })
			.attr("y", function (d) { return y(d.Count); })
			.attr("width", x.bandwidth())
			.attr("height", function (d) { return h - y(d.Count); })
			.style("fill", function (d) { return color(d.DensityGroup) })

		g.selectAll("rect").on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)
	}


	update('conf', data_conf, data_conf2)


	// Button related events:
	var el = document.getElementById("ConfirmedButton");
	el.onclick = function () {
		console.log("We are inside Confirmed cases Event:");
		document.getElementById("my_dataviz3").innerHTML = "";
		update('conf', data_conf, data_conf2)
	}

	var el = document.getElementById("DeathButton");
	el.onclick = function () {
		console.log("We are inside Death cases Event:");
		document.getElementById("my_dataviz3").innerHTML = "";
		update('death', data_death, data_death2)
	}


}