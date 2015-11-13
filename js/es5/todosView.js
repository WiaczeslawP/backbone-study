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
