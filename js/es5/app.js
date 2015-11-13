'use strict';

var _appView = require('./appView');

var _router = require('./router');

$(function () {
	new _appView.AppView();
	new _router.Workspace();
	Backbone.history.start();
});
//# sourceMappingURL=app.js.map
