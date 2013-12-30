
suite('Events#on()', function(){

  test('Should fire all callbacks registered under the name', function() {
    var emitter = new Events();
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();
    var name = 'eventname';

    emitter.on(name, callback1);
    emitter.on(name, callback2);

    emitter.fire(name);

    assert(callback1.called);
    assert(callback2.called);
  });

  test('The callback should receive the arguments that the events was fired with', function() {
    var emitter = new Events();
    var callback = sinon.spy();
    var name = 'eventname';
    var arg1 = 'foo';
    var arg2 = 'bar';

    emitter.on(name, callback);
    emitter.fire(name, arg1, arg2);

    assert(callback.calledWith(arg1, arg2));
  });

  test('Should be able to fire and events name without any `.on()` listeners being registered', function() {
    var emitter = new Events();
    var spy = sinon.spy();

    try {
      emitter.fire('eventname');
    } catch (error) {
      spy.call();
    }

    assert(!spy.called);
  });

  test('Should not create a namespace (only Events#on should create namespaces)', function() {
    var emitter = new Events();

    emitter.fire('eventname');

    assert(!emitter._cbs['eventname']);
  });

  test('Should be chainable', function() {
    var emitter = new Events();
    var callback = sinon.spy();

    emitter.on('eventname', callback);

    emitter
      .fire('eventname')
      .fire('eventname');

    assert(callback.calledTwice);
  });

  test('Should fire in the order they were bound', function() {
    var emitter = new Events();
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();

    emitter.on('eventname', callback1);
    emitter.on('eventname', callback2);
    emitter.fire('eventname');

    // TODO: Check Sinon docs for API to do this
    //assert.callOrder(callback1, callback2);
  });

  test('Should able to define the context on which to fire', function() {
    var emitter = new Events();
    var ctx = { overriden: 'context' };
    var callback1 = sinon.spy();
    var callback2 = sinon.spy();

    emitter.on('eventname', function() {
      assert(this.overriden === 'context');
    });

    emitter.fire({ name: 'eventname', ctx: ctx });
  });

  test('Should call all callbacks even if they are defined inside a callback of the same name', function() {
    var emitter = new Events();
    var callback = sinon.spy();

    emitter.on('eventname', callback);
    emitter.on('eventname', function() {
      callback.call();
      emitter.on('eventname', callback);
    });

    emitter.fire('eventname');

    assert(callback.calledThrice);
  });
});