class Router {
  static #instance;
  #routes = [];
  #rootElement;
  #component;
  #params;

  constructor(id) {
    this.#rootElement = document.getElementById(id);

    window.addEventListener('hashchange', this.initComponent, false);

    return this;
  }

  static getInstance(id) {
     if (!this.#instance) {
       this.#instance = new Router(id);
     }

     return this.#instance;
  }

  get params() {
    return this.#params.slice(1);
  }

  init() {
    this.initComponent();

    return this;
  }

  add(path, component) {
    const pathRegExp = new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');

    this.#routes.push({
      pathRegExp,
      component,
    });

    return this;
  }

  push(path) {
    const route = this._getRouteByPath(path);

    if (route) {
      location.hash = path;
    }

    return this;
  }

  initComponent = () => {
    const path = location.hash.slice(1);
    const route = this._getRouteByPath(path);

    if (!route) {
      return;
    }

    if (this.#component) {
      this.#component.destroy();
    }

    this.#params = this._getParamsByPath(route.pathRegExp, path);

    this.#component = new route.component({ router: this });
    this.#component.init(this.render);
  };

  render = () => {
    this.#rootElement.innerHTML = this.#component.render();
    this.#component.updated();
  };

  _getRouteByPath(path) {
    return this.#routes.find(r => path.match(r.pathRegExp));
  }

  _getParamsByPath(pathRegExp, path) {
    return path.match(pathRegExp);
  }
}

module.exports = { Router };