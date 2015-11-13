const ENTER_KEY = 13;

export default class TodoView extends Backbone.View {
	get tagName() {
		return 'li';
	}
	get template() {
		return _.template( $('#categoryTemplate').html() );
	} 
	get events() {
		return {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		};
	}
	get $input() {
		return this.$el.find('.edit');
	}
	constructor(options) {
		super(options);
		this.listenTo( this.model, 'change', this.render );
		this.listenTo( this.model, 'destroy', this.destroy );
	}
	get template() {
		return _.template( $('#item-template').html() );
	}
	render() {
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
	toggleCompleted() {
		this.model.toggle();
	}
	clear() {
		this.model.destroy();
	}
	destroy() {
		this.remove();
	}
	edit() {
		this.$el.addClass('editing');
		this.$input.focus();
	}
	close() {
		var value = this.$input.val().trim();
		if (value) {
			this.model.save({ title: value });
		}
		this.$el.removeClass('editing');
	}
	updateOnEnter(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	}
}