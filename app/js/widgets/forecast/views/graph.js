define([

	'jquery',
	'backbone',
	'underscore',
	'widgets/graph/views/lineGraph',
	'text!widgets/forecast/templates/master.html',
	'd3',
	'handlebars'

], function( $, Backbone, _, lineGraph, textTemplate, d3, Handlebars) {
	
	var GraphView = Backbone.View.extend({

		initialize: function(options){},

		template: window.Handlebars.compile(textTemplate),

		render: function(){
			var markup = this.template;
			this.$el.append(markup);
			this.appendGraph();
			return this;
		},

		appendGraph: function(){

			var el = this.el;

			d3.csv("js/widgets/shared/resources/hiex/forecast.csv", function(data){
				
				var chart,
					parse = d3.time.format("%Y-%m-%d").parse;

				chart = lineGraph()
					.areaWidth(900)
					.getX(function(d){ return parse(d.date); })
					.getY(function(d){ return +d.amount; })
					.showCircles(false);
		
				d3.select('.forecast-graph')
					.datum(data)
					.transition().duration(500)
					.call(chart);

			});

			return this;

		}

	});

	return GraphView;

});