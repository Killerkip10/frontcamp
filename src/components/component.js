const component = Component => class {
  #component;
  #rerender;

  constructor({ router, ...rest }) {
     this.#component = new Component({ apply: this.apply, router, ...rest });
  }

  componentWillRender() {
    if (this.#component.componentWillRender) {
      this.#component.componentWillRender();
    }
  }

  componentWasRender() {
    if (this.#component.componentWasRender) {
      this.#component.componentWasRender();
    }
  }

  componentDidMount() {
    if (this.#component.componentDidMount) {
      this.#component.componentDidMount();
    }
  }

  componentWillUnmount() {
    if (this.#component.componentWillUnmount) {
      this.#component.componentWillUnmount();
    }
  };

  apply = () => {
    this.#rerender();
  };

  render() {
    this.componentWillRender();

    return this.#component.render();
  }

  updated() {
    this.componentWasRender();
  }

  destroy() {
    this.componentWillUnmount();
  }

  init = (rerender) => {
    this.#rerender = rerender;

    this.#rerender();
    this.componentDidMount();
  }
};

module.exports = { component };