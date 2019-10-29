class Router {
  #routes = [];
  #rootElement;
  #component;
  #params;

  constructor(id) {
    this.#rootElement = document.getElementById(id);

    window.addEventListener('hashchange', this.initComponent, false);

    return this;
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
      this.componentWillUnmount();
    }

    this.#params = this._getParamsByPath(route.pathRegExp, path);
    this.#component = new route.component({ apply: this.componentRender, router: this });

    this.componentRender();
    this.componentDidMount();
  };

  componentRender = () => {
    this.componentWillRender();
    this.#rootElement.innerHTML = this.#component.render();
    this.componentWasRender();
  };

  componentWillRender = () => {
    if (this.#component.componentWillRender) {
      this.#component.componentWillRender();
    }
  };

  componentWasRender = () => {
    if (this.#component.componentWasRender) {
      this.#component.componentWasRender();
    }
  };

  componentDidMount = () => {
    if (this.#component.componentDidMount) {
      this.#component.componentDidMount();
    }
  };

  componentWillUnmount = () => {
    if (this.#component.componentWillUnmount) {
      this.#component.componentWillUnmount();
    }
  };

  _getRouteByPath(path) {
    return this.#routes.find(r => path.match(r.pathRegExp));
  }

  _getParamsByPath(pathRegExp, path) {
    return path.match(pathRegExp);
  }
}

module.exports = { Router };