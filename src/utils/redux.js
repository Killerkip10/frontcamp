const { Subject } = require('./subject');

class Store {
  static #instance;
  #reducers;
  #state = {};
  #stateSubject = new Subject();

  constructor(reducers) {
    this.#reducers = Object.entries(reducers);

    this.dispatch({});
  }

  static getInstance(...params) {
    if (!this.#instance) {
      this.#instance = new Store(...params);
    }

    return this.#instance;
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

module.exports = { Store };