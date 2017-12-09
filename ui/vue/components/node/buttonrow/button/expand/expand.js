define(['text!./expand.html'], function(template) {
	Vue.component("nodeButtonrowNavigationButtonExpand", {
	  template: template,
	  props:[
		'x',
		'y',
		'scaling'
	  ],
	  data: function(){
		  var scalingValue = this.scaling ? this.scaling : 0;
		  return {
			  translationAttribute: "translate("+this.x+", "+this.y+") scale("+scalingValue+", "+scalingValue+")"
		  }
	  },
	  created: function(){
	  }
	});
});