define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3',
	'js/widgets/graph/views/utils',
	'js/widgets/graph/views/circles'
	
], function($, _, Backbone, d3, utils, chartCircles){

	var line = function(){

		var
		core        = null,
		circles     = chartCircles().core(core),
		defined     = function(d,i){ return core.getY()(d,i) !== null; },
		getX        = null,
		getY        = null,
		color       = utils.defaultColors(),
		isArea      = function(d){ return d.area;},
		interpolate = 'linear',
		snapToGrid  = false,
		snapLine,
		groups,
		xScale,
		yScale;

		// Main Axis Function
		// ==============================================

		function chart(selection){
			selection.each(function(data){
				
				var container = d3.select(this),
					parse = d3.time.format("%Y-%m-%d").parse;
				
				xScale = xScale || core.xScale();
				yScale = yScale || core.yScale();

				// Build Nested Data
				stats = d3.nest()
					.key(function(d){return d.type;})
					.sortKeys(function(a,b){return (b == 'ly') ? 1 : -1;})					// TY SECOND
					.sortValues(function(a,b){return (a.date > b.date) ? -1 : 1;})
					.entries(data);

				// Clip Path
				// ==============================================
				container.append('svg:clipPath')
					.attr('id', 'rpm-clip1')
					.append('svg:rect')
						.attr('width', core.width())
						.attr('height', core.height());

				// Line Groups
				// ==============================================
				
				groups = container.selectAll('g.full-line')
							.data(stats, function(d){ return d.key;});

				// Enter
				groups.enter().append('svg:g')
					.attr('class','full-line');
				
				groups.attr("stroke", color)
					.attr("stroke-width", 2)
					.attr("fill",'none');

				// Exit
				d3.transition(groups.exit()).remove();

				// Transition
				d3.transition(groups);

				// Individual Lines
				// ==============================================
				
				var linePaths = groups.selectAll('.line')
									.data(function(d) { return [d.values] ;});
						
				// Enter
				linePaths.enter().append('svg:path')
					.attr("class","line")
					.attr("d",d3.svg.line()
								.interpolate(interpolate)
								.defined(defined)
								.x(function(d,i) { return xScale(core.getX()(d,i)); })
								.y(function(d,i) { return yScale(core.getY()(d,i)); })
					).attr('clip-path','url(#rpm-clip1)');

				// Exit
				d3.transition(groups.exit().selectAll('.line'))
					.attr('d',
						d3.svg.line()
							.interpolate(interpolate)
							.defined(defined)
							.x(function(d,i) { return xScale(core.getX()(d,i)); })
							.y(function(d,i) { return yScale(core.getY()(d,i)); })
					);

				// Transition
				d3.transition(linePaths)
					.attr('d',
						d3.svg.line()
							.interpolate(interpolate)
							.defined(defined)
							.x(function(d,i) { return xScale(core.getX()(d,i)); })
							.y(function(d,i) { return yScale(core.getY()(d,i)); })
					);

				// Circles
				// ==============================================

				groups.call(circles);


				chart.container = this;

			});
			

			return chart;

		}

		// Expose public variables
		// ==============================================
		
		chart.circles = circles;
		
		chart.core = function(_){
			if (!arguments.length) return core;
			circles.core(_);
			core = _;
			return chart;
		};

		chart.interpolate = function(_){
			if (!arguments.length) return interpolate;
			interpolate = _;
			return chart;
		};

		chart.getX = function(_){
			if (!arguments.length) return getX;
			getX = _;
			return chart;
		};

		chart.getY = function(_){
			if (!arguments.length) return getY;
			getY = _;
			return chart;
		};

		chart.snapToGrid = function(_){
			if (!arguments.length) return snapToGrid;
			snapToGrid = _;
			return chart;
		};

		return chart;

	};

	return line;

});


