(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _appView = require('./appView');

var _appView2 = _interopRequireDefault(_appView);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

$(function () {
	new _appView2['default']();
	new _router2['default']();
	Backbone.history.start();
});

},{"./appView":2,"./router":3,"babel-runtime/helpers/interop-require-default":14}],2:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _todosCollection = require('./todosCollection');

var _todosCollection2 = _interopRequireDefault(_todosCollection);

var _todosView = require('./todosView');

var _todosView2 = _interopRequireDefault(_todosView);

var ENTER_KEY = 13;

var AppView = (function (_Backbone$View) {
	_inherits(AppView, _Backbone$View);

	_createClass(AppView, [{
		key: 'el',
		get: function get() {
			return '#todoapp';
		}
	}, {
		key: 'statsTemplate',
		get: function get() {
			return _.template($('#stats-template').html());
		}
	}, {
		key: 'events',
		get: function get() {
			return {
				'keypress #new-todo': 'createOnEnter',
				'click #clear-completed': 'clearCompleted',
				'click #toggle-all': 'toggleAllCompleted'
			};
		}
	}]);

	function AppView(options) {
		var _this = this;

		_classCallCheck(this, AppView);

		_Backbone$View.call(this, options);

		this.todosCollecion = new _todosCollection2['default']();
		this.todosCollecion.fetch().then(function () {
			_this.render();
		});
		this.todosView = new _todosView2['default']({ collection: this.todosCollecion });
		this.listenTo(this.Todos, 'change:completed', this.filterOne);
		this.listenTo(Backbone, 'filter', this.setFilter);
		this.listenTo(this.todosCollecion, 'change', this.renderFooter);
		this.listenTo(this.todosCollecion, 'add', this.renderFooter);
		this.listenTo(this.todosCollecion, 'remove', this.renderFooter);
	}

	AppView.prototype.render = function render() {
		var completed = this.todosCollecion.completed().length;
		var remaining = this.todosCollecion.remaining().length;
		var $main = this.$('#main');
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
	};

	AppView.prototype.setFilter = function setFilter(param) {
		this.$('#filters li a').removeClass('selected').filter('[href="#/' + (param || '') + '"]').addClass('selected');
	};

	AppView.prototype.renderFooter = function renderFooter() {
		var $footer = this.$('#footer');
		var completed = this.todosCollecion.completed().length;
		var remaining = this.todosCollecion.remaining().length;
		if (this.todosCollecion.length) {
			$footer.show();
			$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));
		}
	};

	AppView.prototype.filterOne = function filterOne(todo) {
		todo.trigger('visible');
	};

	AppView.prototype.filterAll = function filterAll(e) {
		Todos.each(this.filterOne, this);
	};

	AppView.prototype.newAttributes = function newAttributes(param) {
		return {
			title: this.$('#new-todo').val().trim(),
			order: this.todosCollecion.nextOrder(),
			completed: false
		};
	};

	AppView.prototype.createOnEnter = function createOnEnter(event) {
		var $input = $(event.currentTarget);
		if (event.which != ENTER_KEY || !$input.val().trim()) {
			return;
		}
		this.todosCollecion.create(this.newAttributes());
		$input.val('');
	};

	AppView.prototype.clearCompleted = function clearCompleted() {
		_.invoke(this.todosCollecion.completed(), 'destroy');
	};

	AppView.prototype.toggleAllCompleted = function toggleAllCompleted() {
		var completed = this.allCheckbox.checked;
		this.todosCollecion.each(function (todo) {
			todo.save({
				'completed': completed
			});
		});
	};

	return AppView;
})(Backbone.View);

exports['default'] = AppView;
module.exports = exports['default'];

},{"./todosCollection":6,"./todosView":7,"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/create-class":12,"babel-runtime/helpers/inherits":13,"babel-runtime/helpers/interop-require-default":14}],3:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var Workspace = (function (_Backbone$Router) {
	_inherits(Workspace, _Backbone$Router);

	function Workspace() {
		_classCallCheck(this, Workspace);

		_Backbone$Router.apply(this, arguments);
	}

	Workspace.prototype.setFilter = function setFilter(param) {
		//TodoFilter = param || '';
		Backbone.trigger('filter', param);
	};

	_createClass(Workspace, [{
		key: 'routes',
		get: function get() {
			return {
				'*filter': 'setFilter'
			};
		}
	}]);

	return Workspace;
})(Backbone.Router);

exports['default'] = Workspace;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/create-class":12,"babel-runtime/helpers/inherits":13}],4:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var Todo = (function (_Backbone$Model) {
	_inherits(Todo, _Backbone$Model);

	function Todo() {
		_classCallCheck(this, Todo);

		_Backbone$Model.apply(this, arguments);
	}

	Todo.prototype.defaults = function defaults() {
		return {
			title: '',
			completed: false
		};
	};

	Todo.prototype.toggle = function toggle() {
		this.save({
			completed: !this.get('completed')
		});
	};

	return Todo;
})(Backbone.Model);

exports['default'] = Todo;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/inherits":13}],5:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;
var ENTER_KEY = 13;

var TodoView = (function (_Backbone$View) {
	_inherits(TodoView, _Backbone$View);

	_createClass(TodoView, [{
		key: 'tagName',
		get: function get() {
			return 'li';
		}
	}, {
		key: 'template',
		get: function get() {
			return _.template($('#categoryTemplate').html());
		}
	}, {
		key: 'events',
		get: function get() {
			return {
				'click .toggle': 'toggleCompleted',
				'dblclick label': 'edit',
				'click .destroy': 'clear',
				'keypress .edit': 'updateOnEnter',
				'blur .edit': 'close'
			};
		}
	}, {
		key: '$input',
		get: function get() {
			return this.$el.find('.edit');
		}
	}]);

	function TodoView(options) {
		_classCallCheck(this, TodoView);

		_Backbone$View.call(this, options);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.destroy);
		//this.$input = this.$el.find('.edit');
	}

	TodoView.prototype.render = function render() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	};

	TodoView.prototype.toggleCompleted = function toggleCompleted() {
		this.model.toggle();
	};

	TodoView.prototype.clear = function clear() {
		this.model.destroy();
	};

	TodoView.prototype.destroy = function destroy() {
		this.remove();
	};

	TodoView.prototype.edit = function edit() {
		this.$el.addClass('editing');
		this.$input.focus();
	};

	TodoView.prototype.close = function close() {
		var value = this.$input.val().trim();
		if (value) {
			this.model.save({ title: value });
		}
		this.$el.removeClass('editing');
	};

	TodoView.prototype.updateOnEnter = function updateOnEnter(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	};

	_createClass(TodoView, [{
		key: 'template',
		get: function get() {
			return _.template($('#item-template').html());
		}
	}]);

	return TodoView;
})(Backbone.View);

exports['default'] = TodoView;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/create-class":12,"babel-runtime/helpers/inherits":13}],6:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _todoModel = require('./todoModel');

var _todoModel2 = _interopRequireDefault(_todoModel);

var TodoList = (function (_Backbone$Collection) {
	_inherits(TodoList, _Backbone$Collection);

	function TodoList(options) {
		_classCallCheck(this, TodoList);

		_Backbone$Collection.call(this, options);
		this.model = _todoModel2['default'];
		this.localStorage = new Backbone.LocalStorage('todos-backbone');
	}

	TodoList.prototype.completed = function completed() {
		return this.filter(function (todo) {
			return todo.get('completed');
		});
	};

	TodoList.prototype.remaining = function remaining() {
		return this.filter(function (todo) {
			return !todo.get('completed');
		});
	};

	TodoList.prototype.nextOrder = function nextOrder() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1;
	};

	TodoList.prototype.comparator = function comparator(todo) {
		return todo.get('order');
	};

	return TodoList;
})(Backbone.Collection);

exports['default'] = TodoList;
module.exports = exports['default'];

},{"./todoModel":4,"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/inherits":13,"babel-runtime/helpers/interop-require-default":14}],7:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _todoView = require('./todoView');

var _todoView2 = _interopRequireDefault(_todoView);

var _todosCollection = require('./todosCollection');

var _todosCollection2 = _interopRequireDefault(_todosCollection);

var TodosView = (function (_Backbone$View) {
	_inherits(TodosView, _Backbone$View);

	_createClass(TodosView, [{
		key: 'el',
		get: function get() {
			return '#todo-list';
		}
	}, {
		key: 'template',
		get: function get() {
			return _.template($('#item-template').html());
		}
	}]);

	function TodosView(options) {
		_classCallCheck(this, TodosView);

		_Backbone$View.call(this, options);
		this.listenTo(Backbone, 'filter', this.render);
		this.filter = '';
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'add', this.renderTodo);
	}

	TodosView.prototype.renderTodo = function renderTodo(item) {
		var todoView = new _todoView2['default']({
			model: item
		});
		this.$el.append(todoView.render().el);
	};

	TodosView.prototype.render = function render(param) {
		this.filter = param;
		this.$el.html('');
		var todos = this.collection.filter(function (todo) {
			if (param == 'completed') {
				return todo.get('completed');
			} else if (param == 'active') {
				return !todo.get('completed');
			} else {
				return true;
			}
		});
		_.each(todos, function (item) {
			this.renderTodo(item);
		}, this);
	};

	return TodosView;
})(Backbone.View);

exports['default'] = TodosView;
module.exports = exports['default'];

},{"./todoView":5,"./todosCollection":6,"babel-runtime/helpers/class-call-check":11,"babel-runtime/helpers/create-class":12,"babel-runtime/helpers/inherits":13,"babel-runtime/helpers/interop-require-default":14}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":15}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":16}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":17}],11:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],12:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":9}],13:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":8,"babel-runtime/core-js/object/set-prototype-of":10}],14:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],15:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":25}],16:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":25}],17:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":20,"../../modules/es6.object.set-prototype-of":27}],18:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],19:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":24}],20:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],21:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":18}],22:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":20,"./$.ctx":21,"./$.global":23}],23:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],24:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],25:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],26:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":25,"./$.an-object":19,"./$.ctx":21,"./$.is-object":24}],27:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":22,"./$.set-proto":26}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcHVja292dmFjZXNsYXYvRG9jdW1lbnRzL2JhY2tib25lLXN0dWR5L2pzL2FwcC5qcyIsIi9Vc2Vycy9wdWNrb3Z2YWNlc2xhdi9Eb2N1bWVudHMvYmFja2JvbmUtc3R1ZHkvanMvYXBwVmlldy5qcyIsIi9Vc2Vycy9wdWNrb3Z2YWNlc2xhdi9Eb2N1bWVudHMvYmFja2JvbmUtc3R1ZHkvanMvcm91dGVyLmpzIiwiL1VzZXJzL3B1Y2tvdnZhY2VzbGF2L0RvY3VtZW50cy9iYWNrYm9uZS1zdHVkeS9qcy90b2RvTW9kZWwuanMiLCIvVXNlcnMvcHVja292dmFjZXNsYXYvRG9jdW1lbnRzL2JhY2tib25lLXN0dWR5L2pzL3RvZG9WaWV3LmpzIiwiL1VzZXJzL3B1Y2tvdnZhY2VzbGF2L0RvY3VtZW50cy9iYWNrYm9uZS1zdHVkeS9qcy90b2Rvc0NvbGxlY3Rpb24uanMiLCIvVXNlcnMvcHVja292dmFjZXNsYXYvRG9jdW1lbnRzL2JhY2tib25lLXN0dWR5L2pzL3RvZG9zVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2ludGVyb3AtcmVxdWlyZS1kZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmEtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt1QkNBb0IsV0FBVzs7OztzQkFDVCxVQUFVOzs7O0FBRWhDLENBQUMsQ0FBQyxZQUFNO0FBQ1AsMkJBQWEsQ0FBQztBQUNkLDBCQUFlLENBQUM7QUFDaEIsU0FBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBcHBWaWV3IGZyb20gJy4vYXBwVmlldyc7XG5pbXBvcnQgV29ya3NwYWNlIGZyb20gJy4vcm91dGVyJztcblxuJCgoKSA9PiB7XG5cdG5ldyBBcHBWaWV3KCk7XG5cdG5ldyBXb3Jrc3BhY2UoKTtcblx0QmFja2JvbmUuaGlzdG9yeS5zdGFydCgpO1xufSk7IiwiaW1wb3J0IFRvZG9MaXN0IGZyb20gJy4vdG9kb3NDb2xsZWN0aW9uJztcbmltcG9ydCBUb2Rvc1ZpZXcgZnJvbSAnLi90b2Rvc1ZpZXcnO1xuXG5jb25zdCBFTlRFUl9LRVkgPSAxMztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXcge1xuXHRnZXQgZWwoKSB7XG5cdFx0cmV0dXJuICcjdG9kb2FwcCc7XG5cdH1cblxuXHRnZXQgc3RhdHNUZW1wbGF0ZSgpIHtcblx0XHRyZXR1cm4gXy50ZW1wbGF0ZSggJCgnI3N0YXRzLXRlbXBsYXRlJykuaHRtbCgpICk7XG5cdH1cblxuXHRnZXQgZXZlbnRzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQna2V5cHJlc3MgI25ldy10b2RvJzogJ2NyZWF0ZU9uRW50ZXInLFxuXHRcdFx0J2NsaWNrICNjbGVhci1jb21wbGV0ZWQnOiAnY2xlYXJDb21wbGV0ZWQnLFxuXHRcdFx0J2NsaWNrICN0b2dnbGUtYWxsJzogJ3RvZ2dsZUFsbENvbXBsZXRlZCdcblx0XHR9O1xuXHR9IFxuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcdFxuXG5cdFx0dGhpcy50b2Rvc0NvbGxlY2lvbiA9IG5ldyBUb2RvTGlzdCgpO1xuXHRcdHRoaXMudG9kb3NDb2xsZWNpb24uZmV0Y2goKS50aGVuKCgpPT57XG5cdFx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdH0pO1xuXHRcdHRoaXMudG9kb3NWaWV3ID0gbmV3IFRvZG9zVmlldyh7Y29sbGVjdGlvbjp0aGlzLnRvZG9zQ29sbGVjaW9ufSk7XG5cdFx0dGhpcy5saXN0ZW5Ubyh0aGlzLlRvZG9zLCAnY2hhbmdlOmNvbXBsZXRlZCcsIHRoaXMuZmlsdGVyT25lKTtcblx0XHR0aGlzLmxpc3RlblRvKEJhY2tib25lLCAnZmlsdGVyJywgdGhpcy5zZXRGaWx0ZXIpO1xuXHRcdHRoaXMubGlzdGVuVG8odGhpcy50b2Rvc0NvbGxlY2lvbiwgJ2NoYW5nZScsIHRoaXMucmVuZGVyRm9vdGVyKTtcblx0XHR0aGlzLmxpc3RlblRvKHRoaXMudG9kb3NDb2xsZWNpb24sICdhZGQnLCB0aGlzLnJlbmRlckZvb3Rlcik7XG5cdFx0dGhpcy5saXN0ZW5Ubyh0aGlzLnRvZG9zQ29sbGVjaW9uLCAncmVtb3ZlJywgdGhpcy5yZW5kZXJGb290ZXIpO1xuXHR9XG5cdHJlbmRlcigpIHtcblx0XHR2YXIgY29tcGxldGVkID0gdGhpcy50b2Rvc0NvbGxlY2lvbi5jb21wbGV0ZWQoKS5sZW5ndGg7XG5cdFx0dmFyIHJlbWFpbmluZyA9IHRoaXMudG9kb3NDb2xsZWNpb24ucmVtYWluaW5nKCkubGVuZ3RoO1xuXHRcdGxldCAkbWFpbiA9IHRoaXMuJCgnI21haW4nKTtcblx0XHRpZiAodGhpcy50b2Rvc0NvbGxlY2lvbi5sZW5ndGgpIHtcblx0XHRcdCRtYWluLnNob3coKTtcblx0XHRcdHRoaXMucmVuZGVyRm9vdGVyKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRtYWluLmhpZGUoKTtcblx0XHRcdCRmb290ZXIuaGlkZSgpO1xuXHRcdH1cblx0XHR0aGlzLmFsbENoZWNrYm94ID0gdGhpcy4kKCcjdG9nZ2xlLWFsbCcpWzBdO1xuXHRcdHRoaXMuYWxsQ2hlY2tib3guY2hlY2tlZCA9ICFyZW1haW5pbmc7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0c2V0RmlsdGVyKHBhcmFtKSB7XG5cdFx0dGhpcy4kKCcjZmlsdGVycyBsaSBhJylcblx0XHRcdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKVxuXHRcdFx0LmZpbHRlcignW2hyZWY9XCIjLycgKyAoIHBhcmFtIHx8ICcnICkgKyAnXCJdJylcblx0XHRcdC5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblx0fVxuXHRyZW5kZXJGb290ZXIoKXtcblx0XHRsZXQgJGZvb3RlciA9IHRoaXMuJCgnI2Zvb3RlcicpO1xuXHRcdGxldCBjb21wbGV0ZWQgPSB0aGlzLnRvZG9zQ29sbGVjaW9uLmNvbXBsZXRlZCgpLmxlbmd0aDtcblx0XHRsZXQgcmVtYWluaW5nID0gdGhpcy50b2Rvc0NvbGxlY2lvbi5yZW1haW5pbmcoKS5sZW5ndGg7XG5cdFx0aWYgKHRoaXMudG9kb3NDb2xsZWNpb24ubGVuZ3RoKSB7XG5cdFx0XHQkZm9vdGVyLnNob3coKTtcblx0XHRcdCRmb290ZXIuaHRtbCh0aGlzLnN0YXRzVGVtcGxhdGUoe1xuXHRcdFx0XHRjb21wbGV0ZWQ6IGNvbXBsZXRlZCxcblx0XHRcdFx0cmVtYWluaW5nOiByZW1haW5pbmdcblx0XHRcdH0pKVxuXHRcdH1cblx0fVxuXG5cdGZpbHRlck9uZSh0b2RvKSB7XG5cdFx0dG9kby50cmlnZ2VyKCd2aXNpYmxlJyk7XG5cdH1cblx0ZmlsdGVyQWxsKGUpIHtcblx0XHRUb2Rvcy5lYWNoKHRoaXMuZmlsdGVyT25lLCB0aGlzKTtcblx0fVxuXHRuZXdBdHRyaWJ1dGVzKHBhcmFtKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiB0aGlzLiQoJyNuZXctdG9kbycpLnZhbCgpLnRyaW0oKSxcblx0XHRcdG9yZGVyOiB0aGlzLnRvZG9zQ29sbGVjaW9uLm5leHRPcmRlcigpLFxuXHRcdFx0Y29tcGxldGVkOiBmYWxzZVxuXHRcdH07XG5cdH1cblx0Y3JlYXRlT25FbnRlcihldmVudCkge1xuXHRcdGxldCAkaW5wdXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXHRcdGlmIChldmVudC53aGljaCAhPSBFTlRFUl9LRVkgfHwgISRpbnB1dC52YWwoKS50cmltKCkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMudG9kb3NDb2xsZWNpb24uY3JlYXRlKCB0aGlzLm5ld0F0dHJpYnV0ZXMoKSApO1xuXHRcdCRpbnB1dC52YWwoJycpO1xuXHR9XG5cdGNsZWFyQ29tcGxldGVkKCkge1xuXHRcdF8uaW52b2tlKHRoaXMudG9kb3NDb2xsZWNpb24uY29tcGxldGVkKCksICdkZXN0cm95Jyk7XG5cdH1cblx0dG9nZ2xlQWxsQ29tcGxldGVkKCkge1xuXHRcdHZhciBjb21wbGV0ZWQgPSB0aGlzLmFsbENoZWNrYm94LmNoZWNrZWQ7XG5cdFx0dGhpcy50b2Rvc0NvbGxlY2lvbi5lYWNoKGZ1bmN0aW9uKHRvZG8pe1xuXHRcdFx0dG9kby5zYXZlKHtcblx0XHRcdFx0J2NvbXBsZXRlZCc6IGNvbXBsZXRlZFxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya3NwYWNlIGV4dGVuZHMgQmFja2JvbmUuUm91dGVyIHtcblx0Z2V0IHJvdXRlcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0JypmaWx0ZXInOiAnc2V0RmlsdGVyJ1xuXHRcdH1cblx0fVxuXHRzZXRGaWx0ZXIocGFyYW0pIHtcblx0XHQvL1RvZG9GaWx0ZXIgPSBwYXJhbSB8fCAnJztcblx0XHRCYWNrYm9uZS50cmlnZ2VyKCdmaWx0ZXInLCBwYXJhbSk7XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXHRkZWZhdWx0cygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0Y29tcGxldGVkOiBmYWxzZVxuXHRcdH07XG5cdH1cblx0dG9nZ2xlKCkge1xuXHRcdHRoaXMuc2F2ZSh7XG5cdFx0XHRjb21wbGV0ZWQ6ICF0aGlzLmdldCgnY29tcGxldGVkJylcblx0XHR9KTtcblx0fVxufSIsImNvbnN0IEVOVEVSX0tFWSA9IDEzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXcge1xuXHRnZXQgdGFnTmFtZSgpIHtcblx0XHRyZXR1cm4gJ2xpJztcblx0fVxuXHRnZXQgdGVtcGxhdGUoKSB7XG5cdFx0cmV0dXJuIF8udGVtcGxhdGUoICQoJyNjYXRlZ29yeVRlbXBsYXRlJykuaHRtbCgpICk7XG5cdH0gXG5cdGdldCBldmVudHMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdCdjbGljayAudG9nZ2xlJzogJ3RvZ2dsZUNvbXBsZXRlZCcsXG5cdFx0XHQnZGJsY2xpY2sgbGFiZWwnOiAnZWRpdCcsXG5cdFx0XHQnY2xpY2sgLmRlc3Ryb3knOiAnY2xlYXInLFxuXHRcdFx0J2tleXByZXNzIC5lZGl0JzogJ3VwZGF0ZU9uRW50ZXInLFxuXHRcdFx0J2JsdXIgLmVkaXQnOiAnY2xvc2UnXG5cdFx0fTtcblx0fVxuXHRnZXQgJGlucHV0KCkge1xuXHRcdHJldHVybiB0aGlzLiRlbC5maW5kKCcuZWRpdCcpO1xuXHR9XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmxpc3RlblRvKCB0aGlzLm1vZGVsLCAnY2hhbmdlJywgdGhpcy5yZW5kZXIgKTtcblx0XHR0aGlzLmxpc3RlblRvKCB0aGlzLm1vZGVsLCAnZGVzdHJveScsIHRoaXMuZGVzdHJveSApO1xuXHRcdC8vdGhpcy4kaW5wdXQgPSB0aGlzLiRlbC5maW5kKCcuZWRpdCcpO1xuXHR9XG5cdGdldCB0ZW1wbGF0ZSgpIHtcblx0XHRyZXR1cm4gXy50ZW1wbGF0ZSggJCgnI2l0ZW0tdGVtcGxhdGUnKS5odG1sKCkgKTtcblx0fVxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy4kZWwuaHRtbCggdGhpcy50ZW1wbGF0ZSggdGhpcy5tb2RlbC50b0pTT04oKSApKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHR0b2dnbGVDb21wbGV0ZWQoKSB7XG5cdFx0dGhpcy5tb2RlbC50b2dnbGUoKTtcblx0fVxuXHRjbGVhcigpIHtcblx0XHR0aGlzLm1vZGVsLmRlc3Ryb3koKTtcblx0fVxuXHRkZXN0cm95KCkge1xuXHRcdHRoaXMucmVtb3ZlKCk7XG5cdH1cblx0ZWRpdCgpIHtcblx0XHR0aGlzLiRlbC5hZGRDbGFzcygnZWRpdGluZycpO1xuXHRcdHRoaXMuJGlucHV0LmZvY3VzKCk7XG5cdH1cblx0Y2xvc2UoKSB7XG5cdFx0dmFyIHZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCkudHJpbSgpO1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5tb2RlbC5zYXZlKHsgdGl0bGU6IHZhbHVlIH0pO1xuXHRcdH1cblx0XHR0aGlzLiRlbC5yZW1vdmVDbGFzcygnZWRpdGluZycpO1xuXHR9XG5cdHVwZGF0ZU9uRW50ZXIoZSkge1xuXHRcdGlmIChlLndoaWNoID09PSBFTlRFUl9LRVkpIHtcblx0XHRcdHRoaXMuY2xvc2UoKTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgVG9kbyBmcm9tICcuL3RvZG9Nb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvbiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLm1vZGVsID0gVG9kbztcblx0XHR0aGlzLmxvY2FsU3RvcmFnZSA9IG5ldyBCYWNrYm9uZS5Mb2NhbFN0b3JhZ2UoJ3RvZG9zLWJhY2tib25lJyk7XG5cdH1cblx0Y29tcGxldGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcigodG9kbykgPT4gdG9kby5nZXQoJ2NvbXBsZXRlZCcpKTtcblx0fVxuXHRyZW1haW5pbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKCh0b2RvKSA9PiAhdG9kby5nZXQoJ2NvbXBsZXRlZCcpKTtcblx0fVxuXHRuZXh0T3JkZXIoKSB7XG5cdFx0aWYgKCAhdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMubGFzdCgpLmdldCgnb3JkZXInKSArIDE7XG5cdH1cblx0Y29tcGFyYXRvcih0b2RvKXtcblx0XHRyZXR1cm4gdG9kby5nZXQoJ29yZGVyJyk7XG5cdH1cbn0iLCJpbXBvcnQgVG9kb1ZpZXcgZnJvbSAnLi90b2RvVmlldyc7XG5pbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi90b2Rvc0NvbGxlY3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2Rvc1ZpZXcgZXh0ZW5kcyBCYWNrYm9uZS5WaWV3IHtcblx0Z2V0IGVsKCkge1xuXHRcdHJldHVybiAnI3RvZG8tbGlzdCc7XG5cdH1cblx0Z2V0IHRlbXBsYXRlKCkge1xuXHRcdHJldHVybiBfLnRlbXBsYXRlKCAkKCcjaXRlbS10ZW1wbGF0ZScpLmh0bWwoKSApO1xuXHR9XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmxpc3RlblRvKEJhY2tib25lLCAnZmlsdGVyJywgdGhpcy5yZW5kZXIpO1xuXHRcdHRoaXMuZmlsdGVyID0gJyc7XG5cdFx0dGhpcy5saXN0ZW5UbyggdGhpcy5jb2xsZWN0aW9uLCAncmVzZXQnLCB0aGlzLnJlbmRlciApO1xuXHRcdHRoaXMubGlzdGVuVG8oIHRoaXMuY29sbGVjdGlvbiwgJ2FkZCcsIHRoaXMucmVuZGVyVG9kbyApO1xuXHR9XG5cdHJlbmRlclRvZG8oaXRlbSkge1xuXHRcdHZhciB0b2RvVmlldyA9IG5ldyBUb2RvVmlldyh7XG5cdFx0XHRtb2RlbDogaXRlbVxuXHRcdH0pO1xuXHRcdHRoaXMuJGVsLmFwcGVuZCggdG9kb1ZpZXcucmVuZGVyKCkuZWwgKTtcblx0fVxuXHRyZW5kZXIocGFyYW0pIHtcblx0XHR0aGlzLmZpbHRlciA9IHBhcmFtO1xuXHRcdHRoaXMuJGVsLmh0bWwoJycpO1xuXHRcdGxldCB0b2RvcyA9IHRoaXMuY29sbGVjdGlvbi5maWx0ZXIoKHRvZG8pID0+IHtcblx0XHRcdGlmIChwYXJhbSA9PSAnY29tcGxldGVkJykge1xuXHRcdFx0XHRyZXR1cm4gdG9kby5nZXQoJ2NvbXBsZXRlZCcpO1xuXHRcdFx0fSBlbHNlIGlmIChwYXJhbSA9PSAnYWN0aXZlJykge1xuXHRcdFx0XHRyZXR1cm4gIXRvZG8uZ2V0KCdjb21wbGV0ZWQnKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdF8uZWFjaCh0b2RvcywgZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0dGhpcy5yZW5kZXJUb2RvKCBpdGVtICk7XG5cdFx0fSwgdGhpcyApO1xuXHR9XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGNyZWF0ZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfT2JqZWN0JHNldFByb3RvdHlwZU9mID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IF9PYmplY3QkY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfT2JqZWN0JHNldFByb3RvdHlwZU9mID8gX09iamVjdCRzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkLmNyZWF0ZShQLCBEKTtcbn07IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcxLjIuNid9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuLyQuY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgaWYoSVNfUFJPVE8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7IC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCJ2YXIgJE9iamVjdCA9IE9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6ICAgICAkT2JqZWN0LmNyZWF0ZSxcbiAgZ2V0UHJvdG86ICAgJE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgaXNFbnVtOiAgICAge30ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gIGdldERlc2M6ICAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICBzZXREZXNjOiAgICAkT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICAkT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXG4gIGdldEtleXM6ICAgICRPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiAkT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgZWFjaDogICAgICAgW10uZm9yRWFjaFxufTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgZ2V0RGVzYyAgPSByZXF1aXJlKCcuLyQnKS5nZXREZXNjXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vJC5hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuLyQuY3R4JykoRnVuY3Rpb24uY2FsbCwgZ2V0RGVzYyhPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuLyQuc2V0LXByb3RvJykuc2V0fSk7Il19
