define(['treeCalculator', 'text!./diagram.html'], function(treeCalculator, template) {
	Vue.component("diagram", {
	  template: template,
	  props: ['isEdit', 'nodeClicked', 'nodeExpand', 'nodes', 'links']
	});
});