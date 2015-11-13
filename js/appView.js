import TodoList from './todosCollection';
import TodosView from './todosView';

const ENTER_KEY = 13;

export default class AppView extends Backbone.View {
	get el() {
		return '#todoapp';
	}

	get statsTemplate() {
		return _.template( $('#stats-template').html() );
	}

	get events() {
		return {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllCompleted'
		};
	} 

	constructor(options) {
		super(options);	

		this.todosCollecion = new TodoList();
		this.todosCollecion.fetch().then(()=>{
			this.render();
		});
		this.todosView = new TodosView({collection:this.todosCollecion});
		this.listenTo(this.Todos, 'change:completed', this.filterOne);
		this.listenTo(Backbone, 'filter', this.setFilter);
		this.listenTo(this.todosCollecion, 'change', this.renderFooter);
		this.listenTo(this.todosCollecion, 'add', this.renderFooter);
		this.listenTo(this.todosCollecion, 'remove', this.renderFooter);
	}
	render() {
		var completed = this.todosCollecion.completed().length;
		var remaining = this.todosCollecion.remaining().length;
		let $main = this.$('#main');
		if (this.todosCollecion.length) {
			$main.show();
			this.renderFooter();
		} else {
			$main.hide();
			$footer.hide();
		}
		this.allCheckbox = this.$('#toggle-all')[0];
		this.allCheckbox.checked = !remaining;
		return this;
	}
	setFilter(param) {
		this.$('#filters li a')
			.removeClass('selected')
			.filter('[href="#/' + ( param || '' ) + '"]')
			.addClass('selected');
	}
	renderFooter(){
		let $footer = this.$('#footer');
		let completed = this.todosCollecion.completed().length;
		let remaining = this.todosCollecion.remaining().length;
		if (this.todosCollecion.length) {
			$footer.show();
			$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}))
		}
	}

	filterOne(todo) {
		todo.trigger('visible');
	}
	filterAll(e) {
		Todos.each(this.filterOne, this);
	}
	newAttributes(param) {
		return {
			title: this.$('#new-todo').val().trim(),
			order: this.todosCollecion.nextOrder(),
			completed: false
		};
	}
	createOnEnter(event) {
		let $input = $(event.currentTarget);
		if (event.which != ENTER_KEY || !$input.val().trim() ) {
			return;
		}
		this.todosCollecion.create( this.newAttributes() );
		$input.val('');
	}
	clearCompleted() {
		_.invoke(this.todosCollecion.completed(), 'destroy');
	}
	toggleAllCompleted() {
		var completed = this.allCheckbox.checked;
		this.todosCollecion.each(function(todo){
			todo.save({
				'completed': completed
			})
		})
	}
}