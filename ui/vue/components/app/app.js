define(['treeCalculator', 'text!./app.html'], function(treeCalculator, template) {
	Vue.component("app", {
	  template: template,
	  props: [
		'datasource',
		'isEdit'
	  ],
	  data: function() {
	    return {
			"diagram" : {
				"nodes": null,
				"links": null,
				"commandHistory": {
					"currentCommand": null,
					"position": -1,
					"chain": []
				}
			},
			"slide" : {
				"commandHistory": {
					"currentCommand": null,
					"position": -1,
					"chain": []
				}
			},
		};
	  },
	  methods: {
		  assembleSlideUrl: function(fparam_slideAddress){ return "../data/slides/"+fparam_slideAddress+".html"; },
		  openSlide: function(fparam_slideAddress){
			  this.$http.get(this.assembleSlideUrl(fparam_slideAddress)).then(function(response){
				  this.slide.commandHistory.chain.push({
					  action: "open",
					  slideContent: response.data
				  });  
				  this.slide.commandHistory.position++; 
				  this.slide.commandHistory.currentCommand = this.slide.commandHistory.chain[this.slide.commandHistory.position];
			  });
		  },
		  nodeClicked: function(fparam_node){
			  this.openSlide(fparam_node.slideAddress);
		  }
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