define(['text!./fader.html'], function(template) {
	Vue.component("slideFader", {
	  data: function(){
		  return {
			  active: false
		  }
	  },
	  template: template
	});
});