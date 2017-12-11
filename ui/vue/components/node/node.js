define(['text!./node.html'], function(template) {
	Vue.component("node", {
	  template: template,
	  props: [
		'runtimeId', 'x', 'y', 'title', 'slideAddress', 'isEdit', 'nodeExpandAll', 'nodeExpand', 'nodeCollapse'
	  ],
	  methods:{
		  nodeExpandedAll: function(){
			  this.nodeExpandAll(this.runtimeId);
		  },
		  nodeExpanded: function(){
			  this.nodeExpand(this.runtimeId);
		  },
		  nodeCollapsed: function(){
			  this.nodeCollapse(this.runtimeId);
		  },
		  toApp_openSlide: function(fparam_slideAddress){
			  alert(fparam_slideAddress);
		  }
	  }
	});
});