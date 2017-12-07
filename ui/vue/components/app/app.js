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
			var data = response.data.root;
			var dataFirstThree = data;
			dataFirstThree.children.forEach(function(fv, fk){
				fv.children={};
			});
			var treeCalculated = treeCalculator.calculate(dataFirstThree);
			this.diagram.nodes = treeCalculated.nodes;
			this.diagram.links = treeCalculated.links;
		});
	  }
	});
});