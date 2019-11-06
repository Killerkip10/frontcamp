const { errorHandler } = require('./errorHandler');
const { LazyLoading } = require('./lazyLoading');
const { API, API_KEY } = require('../configs');
const { Router } = require('../router');
const { ERROR_COMPONENTS, PATHS } = require('../constants');

class HttpService {
  #lazyLoading = new LazyLoading();

  async get(url, params) {
      const response = await fetch(`${API.HOST}${url}?api-key=${API_KEY}&${params}`);

      if (!response.ok) {
        this.handleError(response.status);
        return errorHandler.handle(response);
      }

      return response.json();
  }

  handleError(status) {
    switch (status) {
      case 401:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_401,
          PATHS.ERROR_401,
          () => Router.getInstance().push(PATHS.ERROR_401),
        );
        break;
      case 404:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_404,
          PATHS.ERROR_404,
          () => Router.getInstance().push(PATHS.ERROR_404),
          );
        break;
      case 500:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_500,
          PATHS.ERROR_500,
          () => Router.getInstance().push(PATHS.ERROR_500),
        );
        break;
    }
  }
}

module.exports = { httpService: new HttpService() };