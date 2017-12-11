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
				"data": null,
				"runtimeIdData": null,
				"runtimeData": null,
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
		  treeCalculate: function(fparam_runtimeData){
			  var data = JSON.parse(JSON.stringify(fparam_runtimeData));
			  return treeCalculator.calculate(data);
		  },
		  applyTree: function(fparam_calculatedTree){
			this.diagram.nodes = fparam_calculatedTree.nodes;
			this.diagram.links = fparam_calculatedTree.links;
		  },
		  applyPan: function(){
			  /* todo : tdebt : urutan function */
			  let target = this.$el.querySelector(".svgPanZoom");
			  let zoomConst = 10000000;
			  setTimeout(function(){
				svgPanZoom(target, {
					maxZoom: 1*zoomConst,
					minZoom: 1/zoomConst
				})
			  }, 100);
		  },
		  reload: function(){
			  /* todo : tdebt : mana nih, struktur yg bener */
			  /* todo : tdebt : jadi sebenernya decoupling tanpa this atau full parameter? */
			  /* todo : tdebt : urutan modul dan modularisasi */
			  /* todo : tdebt : wacana react-vue interop? */
			  this.applyTree(this.treeCalculate(this.diagram.runtimeData));
			  this.applyPan();
		  },
		  nodeClicked: function(fparam_node){
			  this.openSlide(fparam_node.slideAddress);
		  },
		  findNodeByRuntimeId: function(fparam_node, fparam_runtimeId){
			  /* todo : tdebt : auto inc id vs. uuid vs. uuid tapi di file diagram */
			  /* todo : tdebt : aturan urutannya gmn? udah bener penulisan fungsinya? */
			  var freturn = null;
			  var endLoop = false;
			  const recursion = function(fparam_frecurse, fparam_node, fparam_runtimeId){
				  if(!endLoop){
					  if(fparam_node.runtimeId==fparam_runtimeId){
						  freturn = fparam_node;
						  endLoop = true;
					  }
					  else{					  
						  if(fparam_node.children && fparam_node.children.length) fparam_node.children.forEach(function(fv, fk){
							  fparam_frecurse(fparam_frecurse, fv, fparam_runtimeId);
						  });
					  }
				  }
			  };
			  recursion(recursion, fparam_node, fparam_runtimeId);
			  return freturn;
		  },
		  nodeExpandCollapse: function(fparam_id, fparam_boolean){
			  var node = this.findNodeByRuntimeId(this.diagram.runtimeData, fparam_id);
			  if(node.children && node.children.length){
				  node.children.forEach(function(fv, fk){
					  fv.hidden=fparam_boolean;
				  });
			  }
			  this.reload();
		  },
		  nodeExpandCollapseRecursive: function(fparam_id, fparam_boolean){
			  var recurseNode = this.recurseNode;
			  var node = this.findNodeByRuntimeId(this.diagram.runtimeData, fparam_id);
			  if(node.children && node.children.length){
				  node.children.forEach(function(fv, fk){
					  recurseNode(fv, function(fparam_node){
						  fparam_node.hidden=fparam_boolean;
					  });
				  });
			  }
			  this.reload();
		  },
		  nodeExpandedAll: function(fparam_id){
			  this.nodeExpandCollapseRecursive(fparam_id, false);
		  },
		  nodeExpanded: function(fparam_id){
			  this.nodeExpandCollapse(fparam_id, false);
		  },
		  nodeCollapsed: function(fparam_id){
			  this.nodeExpandCollapseRecursive(fparam_id, true);
		  },
		  recurseNode: function(fparam_node, fparam_function){
			  let recursion = function(fparam_recursion, fparam_node, fparam_function){
				  fparam_function(fparam_node);
				  if(fparam_node.children && fparam_node.children.length){
					  fparam_node.children.forEach(function(fv, fk){
						  fparam_recursion(fparam_recursion, fv, fparam_function);
					  });
				  }
			  };
			  recursion(recursion, fparam_node, fparam_function);
		  }
	  },
	  created: function(){
		this.$http.get(this.datasource).then(function(response){
			this.diagram.data = response.data.root;
			this.diagram.runtimeIdData = JSON.parse(JSON.stringify(this.diagram.data));
			var runtimeIds = {count:0};
			const recursivelyAssignId = function(fparam_recursivelyAssignId, fparam_runtimeIds, fparam_object){
				fparam_object.runtimeId = fparam_runtimeIds.count;
				fparam_runtimeIds.count++;
				if(fparam_object.children && fparam_object.children.length>=0) fparam_object.children.forEach(function(fv, fk){
					fparam_recursivelyAssignId(fparam_recursivelyAssignId, fparam_runtimeIds, fv);
				});
			};
			recursivelyAssignId(recursivelyAssignId, runtimeIds, this.diagram.runtimeIdData);
			this.diagram.runtimeData = JSON.parse(JSON.stringify(this.diagram.runtimeIdData));
			/*this.diagram.runtimeData.children.forEach(function(fv, fk){
				fv.children={};
			});*/
			var recurseNode = this.recurseNode;
			recurseNode(this.diagram.runtimeData, function(fparam_node){fparam_node.hidden=false});
			this.diagram.runtimeData.children.forEach(function(fv, fk){ if(fv.children && fv.children.length) fv.children.forEach(function(fv2, fk2){
				recurseNode(fv2, function(fparam_node){
					fparam_node.hidden = true;
				});
			})});
			this.reload();
		});
	  },
	  /* todo : tdebt : perlukah created-mounted digabung */
	  mounted: function(){
		  this.applyPan();
	  }
	});
});