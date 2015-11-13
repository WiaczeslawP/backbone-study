import AppView from './appView';
import Workspace from './router';

$(() => {
	new AppView();
	new Workspace();
	Backbone.history.start();
});