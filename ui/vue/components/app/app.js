define(['treeCalculator', 'text!./app.html'], function(treeCalculator, template) {
	Vue.component("app", {
	  template: template,
	  props: ['datasource'],
	  data: function() {
	    return {
			"diagram" : {
				"nodes": null,
				"links": null
			}
		};
	  },
	  created: function(){
		this.$http.get(this.datasource).then(function(response){
			var treeCalculated = treeCalculator.calculate(response.data.root);
			this.diagram.nodes = treeCalculated.nodes;
			this.diagram.links = treeCalculated.links;
		});
	  }
	});
});