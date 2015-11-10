var app = app || {};
var TodoList = Backbone.Collection.extend({
	model: app.Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone'),
	completed: function() {//завершенные задачи
		return this.filter(function( todo ) {
			return todo.get('completed');
		});
	},
	remaining: function() {//оставшиеся задачи
		return this.filter(function( todo ) {
			return !todo.get('completed');
		});
	},
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	}
},
{
	comparator: function( todo ) {
		return todo.get('order');
	}
});
app.Todos = new TodoList;