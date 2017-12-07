define(['text!./graph.html'], function(template) {
	Vue.component("graph", {
	  template: template,
	  props: [
		'source',
		'target'
	  ]
	});
});