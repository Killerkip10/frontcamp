class Singleton {
  #instance;
  #classInstance;

  constructor(classInstance) {
    this.#classInstance = classInstance;
  }

  getInstance(...params) {
    if (!this.#instance) {
      this.#instance = new this.#classInstance(...params);
    }

    return this.#instance;
  }
}

module.exports = { Singleton };