export default class Workspace extends Backbone.Router {
	get routes() {
		return {
			'*filter': 'setFilter'
		}
	}
	setFilter(param) {
		Backbone.trigger('filter', param);
	}
}