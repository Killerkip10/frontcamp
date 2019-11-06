const { Router } = require('../router');
const { ERROR_COMPONENTS } = require('../constants');

class LazyLoading {
  load(componentName, path, cb) {
    const component = this.getComponentByName(componentName);

    if (component) {
      cb();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `./${componentName}.js`;

    script.onload = () => {
      Router.getInstance().add(path, this.getComponentByName(componentName));
      cb();
    };

    document.head.appendChild(script);
  }

  getComponentByName(componentName) {
    switch (componentName) {
      case ERROR_COMPONENTS.ERROR_401:
        return window[ERROR_COMPONENTS.ERROR_401];
      case ERROR_COMPONENTS.ERROR_404:
        return window[ERROR_COMPONENTS.ERROR_404];
      case ERROR_COMPONENTS.ERROR_500:
        return window[ERROR_COMPONENTS.ERROR_500];
    }
  }
}

module.exports = { LazyLoading };