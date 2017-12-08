define(['text!./pane.html', './page/page'], function(template) {
	Vue.component("slidePane", {
	  template: template,
	  props: ['attachment'],
	  data: function(){return {
			content: ""
	  }},
	  methods: {
		  updateSlideByCommandOpen: function(fparam_newPosition){
			  if(this.attachment.commandHistory.chain[fparam_newPosition].action=="open"){
				  this.content = this.attachment.commandHistory.chain[fparam_newPosition].slideContent;
			  }
		  }
	  },
	  watch: {
		  "attachment.commandHistory.position" : {
			  deep: true,
			  handler: function(fparam_newAttachment, fparam_oldAttachment){
				  this.updateSlideByCommandOpen(fparam_newAttachment, this.attachment.commandHistory);
			  }
		  }
	  }
	});
});