define([
	'../../../../library/bboxcalculator',
	'text!./navigation.html',
	'text!./button/expandall/expandall.html',
	'./button/expandall/expandall',
	'./button/expand/expand',
	'./button/collapse/collapse'
], function(
	bboxcalculator,
	template,
	expandAllTemplate
   ) {
	Vue.component("nodeButtonrowNavigation", {
	  template: template,
	  props: [
		'x', 'y', 'width', 'height'
	  ],
	  data: function(){
		  return {
			  translationAttribute: "translate("+this.x+", "+this.y+")",
			  buttons:{
				  expandAll:{
					  x:0,
					  y:0
				  },
				  expand:{
					  x:0,
					  y:0
				  },
				  collapse:{
					  x:0,
					  y:0
				  },
				  scaling: 1,
				  marginX: 1
			  }
		  }
	  },
	  created: function(){
		  let btnDimension = bboxcalculator.calculate(expandAllTemplate);
		  let btnXPositioning = (function(fparam_btnDimension, fparam_marginX, fparam_navRowBtnScaling, fparam_navRowWidth){return function(fparam_order){
			  let originalX = (fparam_btnDimension.width+(fparam_marginX*2))*fparam_order;
			  let additionalScaling = (1-fparam_navRowBtnScaling)*originalX;
			  //let additionalScaling = 0;
			  return originalX-additionalScaling;
		  }})(btnDimension, this.buttons.marginX, this.buttons.scaling, this.width);
		  this.buttons.expandAll.x = this.width - btnXPositioning(1);
		  this.buttons.expand.x = this.width - btnXPositioning(2);
		  this.buttons.collapse.x = this.width - btnXPositioning(3);
		  this.buttonTranslationAttribute = "scale("+this.buttons.scaling+", "+this.buttons.scaling+")"
	  }
	});
});