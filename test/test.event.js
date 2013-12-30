

suite('Events()', function() {

	test("Instantiating with no arguments should create a new events instance", function() {
		var emitter = new Events();

		assert(emitter instanceof Events);
		assert(emitter.on === Events.prototype.on);
		assert(emitter.off === Events.prototype.off);
		assert(emitter.fire === Events.prototype.fire);
	});

	test("Instantiating with an argument should mixin events", function() {
		var object = {};

		Events(object);

		assert(object.on === Events.prototype.on);
		assert(object.off === Events.prototype.off);
		assert(object.fire === Events.prototype.fire);
	});

	test("Calling without `new` should still return a new instance", function() {
		var emitter = Events();

		assert(emitter instanceof Events);
		assert(emitter.on === Events.prototype.on);
		assert(emitter.off === Events.prototype.off);
		assert(emitter.fire === Events.prototype.fire);
	});
});