define(['treeCalculator', 'text!./diagram.html'], function(treeCalculator, template) {
	Vue.component("diagram", {
	  template: template,
	  props: ['nodeClicked', 'nodes', 'links']
	});
});