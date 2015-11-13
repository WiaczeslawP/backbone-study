import TodoView from './todoView';
import TodoList from './todosCollection';

export default class TodosView extends Backbone.View {
	get el() {
		return '#todo-list';
	}
	get template() {
		return _.template( $('#item-template').html() );
	}
	constructor(options) {
		super(options);
		this.listenTo(Backbone, 'filter', this.render);
		this.filter = '';
		this.listenTo( this.collection, 'reset', this.render );
		this.listenTo( this.collection, 'add', this.renderTodo );
	}
	renderTodo(item) {
		var todoView = new TodoView({
			model: item
		});
		this.$el.append( todoView.render().el );
	}
	render(param) {
		this.filter = param;
		this.$el.html('');
		let todos = this.collection.filter((todo) => {
			if (param == 'completed') {
				return todo.get('completed');
			} else if (param == 'active') {
				return !todo.get('completed');
			} else {
				return true;
			}
		});
		_.each(todos, function(item) {
			this.renderTodo( item );
		}, this );
	}
}