const { Subject } = require('./subject');
const { Singleton } = require('./singleton');

class Store {
  #reducers;
  #state = {};
  #stateSubject = new Subject();

  constructor(reducers) {
    this.#reducers = Object.entries(reducers);

    this.dispatch({});
  }

  getState = () => {
    return this.#state;
  };

  dispatch = (action) => {
    this.#reducers.forEach(([key, reducer]) => this.#state[key] = reducer(this.#state[key], action));
    this.#stateSubject.next();
  };

  subscribe = (cb) => {
    this.#stateSubject.subscribe(cb);

    return { unsubscribe: this.#stateSubject.unsubscribe };
  };
}

module.exports = {
  Store : new Singleton(Store),
};