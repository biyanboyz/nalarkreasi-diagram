define(['text!./vue/components/node/node.html', './library/d3.v3.min'], function(baseNodeTemplate, d3){
	return {
		calculate: function(fparam_nodeTree){
			var marginH = 150;
			var marginV = 30;
			
			var baseNode = document.createElementNS("http://www.w3.org/2000/svg","svg");
			baseNode.innerHTML = baseNodeTemplate;
			baseNode.style.position = "fixed";
			baseNode.style.left = "0";
			baseNode.style.top = "0";
			baseNode.style.visibility = "hidden";
			document.body.appendChild(baseNode);
			var nodeH = baseNode.getBBox().width;
			var nodeW = baseNode.getBBox().height;
		
			var tree = d3.layout.tree()
					.nodeSize([nodeH+marginV, nodeW+marginH]);
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
				return {
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