define([
	
	'jquery',
	'underscore',
	'backbone',
	'd3'
	
	], function($, _, Backbone, d3){

		var utils = {};

		var baseColors = {
			orange: '#f9925e',
			blue: '#008dc0',
			black: '#51646f',
			green: '#aecb74',
			turqoise: '#8bd6d2'
		};

		var colors = _.values(baseColors);

		utils.defaultColors = function(){
			var color = d3.scale.ordinal().range(colors).range();
			return function(d,i){ return d.color || color[i % color.length]; };
		};

		return utils;

	});