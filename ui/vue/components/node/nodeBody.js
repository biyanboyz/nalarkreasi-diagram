define(['text!./nodeBody.html'], function(template) {
	Vue.component("nodeBody", {
	  template: template,
	  props:[
		'title'
	  ]
	});
});