define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3'
	
], function($, _, Backbone, d3){

	var core = function(){

		var
		areaWidth       = 960,
		areaHeight      = 300,
		range           = null,
		margin          = [10,20,40,30],
		availableWidth  = function(){ return areaWidth - margin[1] - margin[3]; },
		availableHeight = function(){ return areaHeight - margin[0] - margin[2]; },
		x               = d3.time.scale(),
		y               = d3.scale.linear(),
		getX            = function(d){ return d.date;},
		getY            = function(d){ return d.amount;},
		xDomain         = null,
		yDomain         = null,
		dateParse       = d3.time.format("%Y-%m-%d"),
		yFormat         = d3.format(",f");
		roundYear		= false;

		// Core Graph Function
		// ==============================================

		function base(selection){
			selection.each(function(data){
				
				var seriesData = data.map(function(d,i){
					return { x: getX(d,i), y: getY(d,i)  };
				});

				x	.domain(xDomain || d3.extent(seriesData.map(function(d){ return d.x; })))
					.range([0,availableWidth()]);

				if(roundYear) x.nice(d3.time.year);

				y	.domain(yDomain || d3.extent(seriesData.map(function(d){ return d.y; }))).nice()
					.range([availableHeight(),0]);

			});

			return base;

		}

		// Expose public variables
		// ==============================================
		
		base.areaWidth = function(_){
			if (!arguments.length) return areaWidth;
			areaWidth = _;
			return base;
		};

		base.areaHeight = function(_){
			if (!arguments.length) return areaHeight;
			areaHeight = _;
			return base;
		};

		base.width = function(_){
			if (!arguments.length) return availableWidth();
			width = _;
			return base;
		};

		base.height = function(_){
			if (!arguments.length) return availableHeight();
			height = _;
			return base;
		};

		base.xScale = function(_){
			if (!arguments.length) return x;
			x = _;
			d3.rebind(base, x, 'domain', 'range');
			return base;
		};

		base.yScale = function(_){
			if (!arguments.length) return y;
			y = _;
			d3.rebind(base, y, 'domain', 'range');
			return base;
		};

		base.yFormat = function(_){
			if (!arguments.length) return yFormat;
			yFormat = _;
			return base;
		};

		base.margin = function(_){
			if (!arguments.length) return margin;
			margin = _;
			return base;
		};

		base.getY = function(_){
			if (!arguments.length) return getY;
			getY = _;
			return base;
		};

		base.getX = function(_){
			if (!arguments.length) return getX;
			getX = _;
			return base;
		};

		base.yDomain = function(_){
			if (!arguments.length) return yDomain;
			yDomain = _;
			return base;
		};

		base.xDomain = function(_){
			if (!arguments.length) return xDomain;
			xDomain = _;
			return base;
		};

		base.roundYear = function(_){
			if (!arguments.length) return roundYear;
			roundYear = _;
			return base;
		};
		
		return base;

	};

	return core;

});


