requirejs.config({
	paths: {
		"text": "./library/require.js/text",
		"treeCalculator": "./library/treecalculator.d3"
	}
});
require([
	'text!./library/svgpan.js', 
	'./vue/components/app/app', 
	'./vue/components/diagram/diagram', 
	'./vue/components/node/node', 
	'./vue/components/graph/graph'
], function(
		panZoom,
		vueComponent_app,
		vueComponent_diagram,
		vueComponent_node,
		vueComponent_graph
	){
	new Vue({
	  el: '#app',
	  components: {
		  vueComponent_app,
		  vueComponent_diagram,
		  vueComponent_node,
		  vueComponent_graph
	  }
	});
});
