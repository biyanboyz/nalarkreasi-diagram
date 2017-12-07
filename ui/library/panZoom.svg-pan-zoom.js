define(['./library/svg-pan-zoom'], function(svgPanZoom){
	return {
		panZoom: function(fparam_element){
			return svgPanZoom(fparam_element);
		}
	};
});