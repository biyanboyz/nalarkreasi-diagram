define(['text!./vue/components/node/node.html', './library/d3.v3.min'], function(baseNodeTemplate, d3){
	return {
		calculate: function(fparam_nodeTree){
			var marginH = 150;
			var marginV = 30;
			
			var baseNodeBlueprintId = "blueprintDiagramNode";
			var baseNode = document.querySelector("#"+baseNodeBlueprintId);
			if(!baseNode){
				baseNode = document.createElementNS("http://www.w3.org/2000/svg","svg");
				baseNode.id = baseNodeBlueprintId;
				baseNode.innerHTML = baseNodeTemplate;
				baseNode.style.position = "fixed";
				baseNode.style.left = "0";
				baseNode.style.top = "0";
				baseNode.style.visibility = "hidden";
				document.body.appendChild(baseNode);
			}
			var nodeH = baseNode.getBBox().width;
			var nodeW = baseNode.getBBox().height;
			var tree = d3.layout.tree() /*d3.layout.cluster()*/
					.nodeSize([nodeH+marginV, nodeW+marginH])
					.separation(function(a, b) {
					  var siblingMostChildren = 0;
					  if(a.parent.children && a.parent.children.length) a.parent.children.forEach(function(fv, fk){
						  if(fv.children && fv.children.length>siblingMostChildren) siblingMostChildren=fv.children.length;
					  });
					  return (a.parent==b.parent ? 1 : 1);
					});
			var nodes = tree.nodes(fparam_nodeTree).reverse();
			nodes = nodes.map(function(fparam_node){
				let originalX = fparam_node.x;
				let originalY = fparam_node.y;
				fparam_node.y = originalX;
				fparam_node.x = originalY;
				return fparam_node;
			});
			var links = tree.links(nodes);
			links = links.map(function(fparam_graph){
				var relatedObject = null;
				nodes.forEach(function(fv, fk){
					if(fparam_graph.target.x==fv.x && fparam_graph.target.y==fv.y) relatedObject=fv;
				});
				return {
					relatedObject: relatedObject,
					source:{
						x: fparam_graph.source.x+100,
						y: fparam_graph.source.y+20
					},
					target:{
						x: fparam_graph.target.x,
						y: fparam_graph.target.y+20
					}
				};
			});
			return {
				nodes: nodes,
				links: links
			};
		}
	};
});