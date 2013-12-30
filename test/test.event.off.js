
suite('Events#off()', function(){

  test("Should remove callback when passed", function() {
    var emitter = new Events();
    var callback = function(){};
    var name = 'eventname';

    emitter.on(name, callback);
    emitter.off(name, callback);

    assert(emitter._cbs[name].indexOf(callback) === -1);
  });

  test("Should remove multiple instances of the same callback", function() {
    var emitter = new Events();
    var callback = function(){};
    var name = 'eventname';

    emitter.on(name, callback);
    emitter.on(name, callback);
    emitter.off(name, callback);

    assert(emitter._cbs[name].indexOf(callback) < 0);
  });

  test("Should remove all callbacks under name when no callback is defined", function() {
    var name = 'eventname';
    var callback1 = function(){};
    var callback2 = function(){};
    var emitter = new Events();

    emitter.on(name, callback1);
    emitter.on(name, callback2);
    emitter.off(name);

    assert(!emitter._cbs[name]);
  });

  test("Should be chainable", function() {
    var emitter = new Events();
    var callback = sinon.spy();
    var callback2 = sinon.spy();

    emitter
      .on('eventname', callback)
      .on('eventname2', callback2);

    emitter
      .off('eventname', callback)
      .off('eventname2', callback2);

    emitter
      .fire('eventname')
      .fire('eventname2');

    assert(!callback.called);
    assert(!callback2.called);
  });
});