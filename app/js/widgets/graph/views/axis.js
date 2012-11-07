define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3'
	
], function($, _, Backbone, d3 ){

	var axis = function(){

			var
			axis = d3.svg.axis(),
			core = null,
			className = '',
			offset = 0,
			scale0;

			// Main Axis Function
			// ==============================================

			function chart(selection){
				
				selection.each(function(data){
					 
					if(!core) base.error(10,'Graph core function missing'); 

					// Default setup for axis
					if(axis.orient() == 'bottom'){

						offset = core.height();
						className = 'x-axis';
						axis.scale(core.xScale())
							.ticks(d3.time.months,1)
							.tickSize(-core.height(),3,0)
							.tickFormat(d3.time.format("%d %b"))
							.tickPadding(20)
							.orient("bottom");

					}else if(axis.orient() == 'left'){

						offset = 0;
						className = 'y-axis';
						axis.scale(core.yScale())
							.tickSize(-core.width(),2,0)
							.ticks(10)
							.tickFormat(core.yFormat())
							.tickPadding(8)
							.orient("left");
					}

					var container = d3.select(this);

					// Translate to offset axis
					var g = container.attr("transform", "translate(0,"+ offset +")");
					
					// Transition axis
					d3.transition(g).call(axis);

				});

				return chart;

			}

			// Bind d3 functions to chart object
			// ==============================================
			
			d3.rebind(chart, axis, 'orient');

			// Expose public variables
			// ==============================================

			chart.core = function(_){
				if (!arguments.length) return core;
				core = _;
				d3.rebind(chart, core, 'width', 'height', 'yScale', 'xScale', 'yFormat');
				return chart;
			};

			chart.scale = function(x) {
				if (!arguments.length) return scale;
				scale = x;
				axis.scale(scale);
				d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands');
				return chart;
			};

			return chart;

		};

	return axis;

});


