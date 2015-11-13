'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoView = (function (_Backbone$View) {
	_inherits(TodoView, _Backbone$View);

	function TodoView(options) {
		_classCallCheck(this, TodoView);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoView).call(this, options));

		_this.tagName = 'li';
		_this.template = _.template($('#item-template').html());
		_this.events = {
			'click .toggle': 'togglecompleted',
			'dblclick label': 'edit',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		};
		_this.listenTo(_this.model, 'change', _this.render);
		_this.listenTo(_this.model, 'destroy', _this.remove);
		_this.listenTo(_this.model, 'visible', _this.toggleVisible);
		return _this;
	}

	_createClass(TodoView, [{
		key: 'render',
		value: function render() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		}
	}, {
		key: 'toggleVisible',
		value: function toggleVisible() {
			this.$el.toggleClass('hidden', this.isHidden);
		}
	}, {
		key: 'togglecompleted',
		value: function togglecompleted() {
			this.model.toggle();
		}
	}, {
		key: 'edit',
		value: function edit() {
			this.$el.addClass('editing');
			this.$input.focus();
		}
	}, {
		key: 'close',
		value: function close() {
			var value = this.$input.val().trim();
			if (value) {
				this.model.save({ title: value });
			}
			this.$el.removeClass('editing');
		}
	}, {
		key: 'updateOnEnter',
		value: function updateOnEnter(e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.model.destroy();
		}
	}, {
		key: 'isHidden',
		get: function get() {
			var isCompleted = this.model.get('completed');
			return !isCompleted && TodoFilter === 'completed' || isCompleted && TodoFilter === 'active';
		}
	}]);

	return TodoView;
})(Backbone.View);

exports.default = TodoView;
//# sourceMappingURL=todosView.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _todoModel = require('./todoModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = (function (_Backbone$Collection) {
	_inherits(TodoList, _Backbone$Collection);

	function TodoList(options) {
		_classCallCheck(this, TodoList);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TodoList).call(this, options));

		_this.model = _todoModel.Todo;
		_this.localStorage = new LocalStorage('todos-backbone');
		return _this;
	}

	_createClass(TodoList, [{
		key: 'completed',
		value: function completed() {
			return this.filter(function (todo) {
				return todo.get('completed');
			});
		}
	}, {
		key: 'remaining',
		value: function remaining() {
			return this.filter(function (todo) {
				return !todo.get('completed');
			});
		}
	}, {
		key: 'nextOrder',
		value: function nextOrder() {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		}
	}, {
		key: 'comparator',
		value: function comparator(todo) {
			return todo.get('order');
		}
	}]);

	return TodoList;
})(Backbone.Collection);

exports.default = Todos = new TodoList();
//# sourceMappingURL=todosCollection.js.map

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = (function (_Backbone$Model) {
	_inherits(Todo, _Backbone$Model);

	function Todo() {
		_classCallCheck(this, Todo);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Todo).apply(this, arguments));
	}

	_createClass(Todo, [{
		key: 'defaults',
		value: function defaults() {
			return {
				title: '',
				completed: false
			};
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			this.save({
				completed: !this.get('completed')
			});
		}
	}]);

	return Todo;
})(Backbone.Model);

exports.default = Todo;
//# sourceMappingURL=todoModel.js.map

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

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Workspace = (function (_Backbone$Router) {
	_inherits(Workspace, _Backbone$Router);

	function Workspace() {
		_classCallCheck(this, Workspace);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Workspace).call(this, options));

		_this.routes = {
			'*filter': 'setFilter'
		};
		return _this;
	}

	_createClass(Workspace, [{
		key: 'setFilter',
		value: function setFilter() {
			var param = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

			TodoFilter = param;
			Todos.trigger('filter');
		}
	}]);

	return Workspace;
})(Backbone.Router);

exports.default = Workspace;
//# sourceMappingURL=router.js.map

'use strict';

var _appView = require('./appView');

var _router = require('./router');

$(function () {
	new _appView.AppView();
	new _router.Workspace();
	Backbone.history.start();
});
//# sourceMappingURL=app.js.map
