define(['text!./page.html'], function(template) {
	Vue.component("slidePanePage", {
		template: template,
		props: ["content"]
	});
});