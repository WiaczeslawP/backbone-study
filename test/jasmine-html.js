import TodoList from '../js/todosCollection';
import Todo from '../js/todoModel';

var JSONcollection = [
	{
		"name": "sdfghfd",
		"completed": true
	},
	{
		"name": "dfghfdghdfgh",
		"completed": false
	},
	{
		"name": "dfghdfg",
		"completed": false
	},
	{
		"name": "rtyurtyu",
		"completed": true
	},
	{
		"name": "zxcvzxcv",
		"completed": true
	}
]; 

var collection; 
var request;
beforeEach(function() {
	collection = new TodoList();
	jasmine.Ajax.install();
	collection.fetch({ ajaxSync: true });
	request = jasmine.Ajax.requests.mostRecent();
	request.respondWith({
		"status": 200,
		"responseText": JSON.stringify(JSONcollection)
	});
});
afterEach(function() {
	collection = null;
	jasmine.Ajax.uninstall();
});


describe("Test collections", function() {
	it("fetch collection", function() {
		expect(collection.length).toBe(5);
	});
	it("gets completed models", function() {
		expect(collection.completed().length).toBe(3);
	});
	it("gets remaining models", function() {
		expect(collection.remaining().length).toBe(2);
	});
});


describe("Test todo-model", function() {
	it("toggle completed", function() {
		collection.create( {name:'todo item', completed:true} );
		let model = collection.at(0);
		model.toggle();
		expect(model.get('completed')).toBe(false);
	});
});