define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3',
	'js/widgets/graph/views/utils'
	
], function($, _, Backbone, d3, utils){

	var circles = function(){

		var
		radius = 6,
		color = utils.defaultColors(),
		showWhiteCircles = true,
		xScale, yScale, x, y, getY, getX, core;

		// Main Axis Function
		// ==============================================

		function chart(selection){
			selection.each(function(data){
				
				var container = d3.select(this);

				var xScale = xScale || core.xScale(),
					yScale = yScale || core.yScale(),
					y = getY || core.getY(),
					x = getX || core.getX();
				
				// Clip Path
				// ==============================================

				container.append("svg:clipPath")
					.attr("id", "rpm-clip2")
					.append("svg:rect")
						.attr("width", core.width() + 10)
						.attr("height", core.height() + 10)
						.attr("transform", "translate(-5,-5)");

				// Circles
				// ==============================================
				
				var circles = container.selectAll("circle.live")
					.data(data.values, function(d){ return d.date; });

				//var circleGroups = circles.enter().append('svg:g').attr('class','circles');

				/*if(showWhiteCircles){
					circleGroups.append("circle")
						.attr("class","white")
						.attr("cy", function(d){return yScale(y(d,i)); })
						.attr("cx", function(d){return xScale(x(d,i)); })
					.transition(500)
						.delay(function(d,i){return i*50;})
						.style("display",function(d){ return y(d,i) === null ? 'none' : 'inline'; })
						.attr("r", radius )
						.attr("fill","#f7f7f7")
						.attr("stroke","none")
						.attr('clip-path','url(#rpm-clip2)');
				}*/

				circles.enter().append("circle")
					.attr("class","live")
					.attr("cy", function(d,i){return yScale(y(d,i)); })
					.attr("cx", function(d,i){return xScale(x(d,i)); })
				.transition(500)
					.delay(function(d,i){return i*50;})
					.style("display",function(d,i){ return y(d,i) === null ? 'none' : 'inline'; })
					.attr("r", radius - 3 )
					.attr("fill", "#f7f7f7")
					.attr('clip-path','url(#rpm-clip2)');
					
				// Transition
				d3.transition(circles)
					//.selectAll('circle')
					.attr("cy", function(d,i){return yScale(y(d,i)); })
					.attr("cx", function(d,i){return xScale(x(d,i)); });

				circles.exit().remove();

				chart.container = this;

			});

			return chart;

		}

		// Expose public variables
		// ==============================================
		
		chart.core = function(_){
			if (!arguments.length) return core;
			core = _;
			return chart;
		};

		chart.x = function(_){
			if (!arguments.length) return getX;
			getX = _;
			return chart;
		};

		chart.y = function(_){
			if (!arguments.length) return getY;
			getY = _;
			return chart;
		};

		chart.xScale = function(_){
			if (!arguments.length) return xScale;
			xScale = _;
			return chart;
		};

		chart.yScale = function(_){
			if (!arguments.length) return yScale;
			yScale = _;
			return chart;
		};

		chart.showWhiteCircles = function(_){
			if (!arguments.length) return showWhiteCircles;
			showWhiteCircles = _;
			return chart;
		};

		return chart;

	};

	return circles;

});


