require([
	
  'jquery',
  'js/widgets/graph/views/graph',
	'impress'

], function($, lineGraph){

  impress().init();

  if ("ontouchstart" in document.documentElement) { 
    document.querySelector(".hint").innerHTML = "<p>Tap on the left or right to navigate</p>";
  }

  var graph = new lineGraph({el:'#ytd-performance'});
  graph.render();

});