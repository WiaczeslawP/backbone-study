'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _todosCollection = require('./todosCollection');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppView = (function (_Backbone$View) {
	_inherits(AppView, _Backbone$View);

	function AppView() {
		_classCallCheck(this, AppView);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppView).call(this, options));

		_this.el = '#todoapp';
		_this.statsTemplate = _.template($('#stats-template').html());
		_this.events = {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllCompleted'
		};
		_this.allCheckbox = _this.$('#toggle-all')[0];
		_this.$input = _this.$('#new-todo');
		_this.$footer = _this.$('#footer');
		_this.$main = _this.$('#main');
		_this.listenTo(_todosCollection.Todos, 'add', _this.addOne);
		_this.listenTo(_todosCollection.Todos, 'reset', _this.addAll);
		_this.listenTo(_todosCollection.Todos, 'change:completed', _this.filterOne);
		_this.listenTo(_todosCollection.Todos, 'filter', _this.filterAll);
		_this.listenTo(_todosCollection.Todos, 'all', _this.render);
		_todosCollection.Todos.fetch();
		return _this;
	}

	_createClass(AppView, [{
		key: 'render',
		value: function render() {
			var completed = app.Todos.completed().length;
			var remaining = app.Todos.remaining().length;
			if (app.Todos.length) {
				this.$main.show();
				this.$footer.show();
				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));
				this.$('#filters li a').removeClass('selected').filter('[href="#/' + (app.TodoFilter || '') + '"]').addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}
			this.allCheckbox.checked = !remaining;
		}
	}, {
		key: 'addOne',
		value: function addOne(todo) {
			var view = new TodoView({ model: todo });
			$('#todo-list').append(view.render().el);
		}
	}, {
		key: 'addAll',
		value: function addAll() {
			this.$('#todo-list').html('');
			_todosCollection.Todos.each(this.addOne, this);
		}
	}, {
		key: 'filterOne',
		value: function filterOne(todo) {
			trigger('visible');
		}
	}, {
		key: 'filterAll',
		value: function filterAll() {
			_todosCollection.Todos.each(this.filterOne, this);
		}
	}, {
		key: 'newAttributes',
		value: function newAttributes() {
			return {
				title: this.$input.val().trim(),
				order: _todosCollection.Todos.nextOrder(),
				completed: false
			};
		}
	}, {
		key: 'createOnEnter',
		value: function createOnEnter(event) {
			if (event.which != ENTER_KEY || !this.$input.val().trim()) {
				return;
			}
			_todosCollection.Todos.create(this.newAttributes());
			this.$input.val('');
		}
	}, {
		key: 'clearCompleted',
		value: function clearCompleted() {
			_.invoke(app.Todos.completed(), 'destroy');
		}
	}, {
		key: 'toggleAllCompleted',
		value: function toggleAllCompleted() {
			var completed = this.allCheckbox.checked;
			_todosCollection.Todos.each(function (todo) {
				todo.save({
					'completed': completed
				});
			});
		}
	}]);

	return AppView;
})(Backbone.View);

exports.default = AppView;
//# sourceMappingURL=appView.js.map
