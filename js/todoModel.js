export default class Todo extends Backbone.Model {
	defaults() {
		return {
			title: '',
			completed: false
		};
	}
	toggle() {
		this.save({
			completed: !this.get('completed')
		});
	}
}