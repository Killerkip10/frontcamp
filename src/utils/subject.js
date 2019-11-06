class Subject {
  #listeners = [];

  subscribe = (cb) => {
    this.#listeners.push(cb);

    return { unsubscribe: () => this.unsubscribe(cb) };
  };

  next = (v) => {
    this.#listeners.forEach(cb => cb(v));
  };

  unsubscribe = (cb) => {
    this.#listeners = this.#listeners.filter(func => func !== cb);
  };
}

module.exports = { Subject };
