define(['text!./node.html'], function(template) {
	Vue.component("node", {
	  template: template,
	  props: [
		'x', 'y', 'title', 'slideAddress'
	  ],
	  methods:{
		  toApp_openSlide: function(fparam_slideAddress){
			  alert(fparam_slideAddress);
		  }
	  }
	});
});