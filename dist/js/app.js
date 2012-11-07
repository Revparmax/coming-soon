require([
	
  'jquery',
  'widgets/ytd/views/graph',
  'widgets/forecast/views/graph',
	'impress'

], function($, ytdGraph, forecastGraph){

  impress().init();

  if ("ontouchstart" in document.documentElement) {
    document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
  }

  var ytd = new ytdGraph({el:'#ytd-performance'});
  ytd.render();

  var forecast = new forecastGraph({el:'#forecasts'});
  forecast.render();

});