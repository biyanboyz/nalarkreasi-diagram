define([], function(){
	return {
		calculate: function(fparam_template){
			var templateInstance = document.createElementNS("http://www.w3.org/2000/svg","svg");
			templateInstance.innerHTML = fparam_template;
			templateInstance.style.position = "fixed";
			templateInstance.style.left = "0";
			templateInstance.style.top = "0";
			templateInstance.style.visibility = "hidden";
			document.body.appendChild(templateInstance);
			return {
				width: templateInstance.getBBox().width,
				height: templateInstance.getBBox().height,
			};
		}
	};
});