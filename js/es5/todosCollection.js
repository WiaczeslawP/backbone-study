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
