define(['text!./node.html'], function(template) {
	Vue.component("node", {
	  template: template,
	  props: [
		'x', 'y', 'title'
	  ]
	});
});