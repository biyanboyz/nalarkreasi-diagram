define(['text!./node.html'], function(template) {
	Vue.component("node", {
	  template: template,
	  props: [
		'runtimeId', 'x', 'y', 'title', 'slideAddress', 'isEdit', 'nodeExpand'
	  ],
	  methods:{
		  nodeExpanded: function(){
			  this.nodeExpand(this.runtimeId);
		  },
		  toApp_openSlide: function(fparam_slideAddress){
			  alert(fparam_slideAddress);
		  }
	  }
	});
});