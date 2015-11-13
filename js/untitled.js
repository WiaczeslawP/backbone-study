export default class TodoView extends Backbone.View {
		get className() {
			return 'categoryContainer';
		} 
		get template() {
			return _.template( $('#categoryTemplate').html() );
		} 
		render() {
			this.$el.html( this.template( this.model.toJSON() ));
			return this;
		}

}