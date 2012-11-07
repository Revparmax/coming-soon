define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3',
	'widgets/graph/views/core',
	'widgets/graph/views/axis',
	'widgets/graph/views/line'
	
], function($, _, Backbone, d3, core, axis, line){

	var lineGraph = function(){
			
		var
		base  = core(),
		lines = line().core(base),
		yAxis = axis().core(base).orient('left'),
		xAxis = axis().core(base).orient('bottom');

		// Main Axis Function
		// ==============================================

		function chart(selection){
			
			selection.each(function(data){
			
				var container = d3.select(this);

				// Build base
				container.call(base);

				var wrap = container.selectAll('g.rpm-graph').data([data]),
					wrapEnter = wrap.enter().append('g').attr('class','rpm-graph').append('g'),
					g = wrap.select('g');

				// Append Graph Container
				var graph = wrapEnter.append("svg:svg")
					.attr("width", base.areaWidth() )
					.attr("height", base.areaHeight() );

						
				var enter =	graph.append("svg:g")
							.attr("class","graph")
							.attr("transform", "translate(" + base.margin()[3] + "," + base.margin()[0] + ")");
				
				// Groups for Axis & Lines
				enter.append('g').attr('class', 'x-axis rpm-axis');
				enter.append('g').attr('class', 'y-axis rpm-axis');
				enter.append('g').attr('class', 'rpm-lineWrap');
				
				// AxisX & AxisY
				d3.transition(g.select('.y-axis')).call(yAxis);
				d3.transition(g.select('.x-axis')).call(xAxis);

				// Lines
				linesWrap = d3.select('.rpm-lineWrap').datum(data);
				d3.transition(linesWrap).call(lines);

				chart.update = function(){ chart(selection); };
				chart.container = this;

			});

			return chart;

		}


		// Expose public variables
		// ==============================================
		
		var events = {};
		
		chart.core = base;
		chart.lines = lines;
		chart.xAxis = xAxis;
		chart.yAxis = yAxis;

		d3.rebind( chart, base, 'getX', 'getY', 'areaWidth', 'roundYear');
		d3.rebind( chart, lines, 'showCircles');

		chart.on = function(_){
			if (!arguments.length) return events;
			// [event, method]
			var dispatcher = events[arguments[0]];
			dispatcher.on(arguments[0],arguments[1]);
			return chart;
		};

		return chart;

	};

	return lineGraph;

});


