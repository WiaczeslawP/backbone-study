import Todo from './todoModel';

export default class TodoList extends Backbone.Collection {
	constructor(options) {
		super(options);
		this.model = Todo;
		this.url = '/todotest';
		this.localStorage = new Backbone.LocalStorage('todos-backbone');
	}
	completed() {
		return this.filter((todo) => todo.get('completed'));
	}
	remaining() {
		return this.filter((todo) => !todo.get('completed'));
	}
	nextOrder() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	}
	comparator(todo){
		return todo.get('order');
	}
}