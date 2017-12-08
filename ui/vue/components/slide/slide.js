define(['text!./slide.html', './fader/fader', './pane/pane'], function(template, fader, pane) {
	Vue.component("slide", {
	  template: template,
	  props: ['isActive', 'attachment']
	});
});