class Error401 {
  status = 401;
  message = 'Not authorized';

  handle() {
    console.log(this.message);
  }
}

class Error404 {
  status = 404;
  message = 'Not found';

  handle() {
    console.log(this.message);
  }
}

class Error500 {
  status = 500;
  message = 'Server error';

  handle() {
    console.log(this.message);
  }
}

class ErrorFactory {
  create(status, ex) {
    switch (status) {
      case 401:
        return new Error401(ex);
      case 404:
        return new Error404(ex);
      case 500:
        return new Error500(ex);
      default:
        return null;
    }
  }
}

class ErrorHandler {
  #handlersList = [];
  #errorFactory = new ErrorFactory();

  handle(ex) {
    const { status } = ex;

    const errorHandler = this.getHandlerByStatus(status);

    if (errorHandler) {
      errorHandler.handle(ex);
    }

    return Promise.reject(ex);
  }

  getHandlerByStatus(status) {
    const handler = this.get(status);

    if (handler) {
      return handler;
    }

    const errorHandler = this.#errorFactory.create(status);

    if (errorHandler) {
      this.add(errorHandler);
    }

    return errorHandler;
  }

  add(obj) {
    this.#handlersList.push(obj);
  }

  get(key) {
    return this.#handlersList.find(({ status }) => status === key);
  }
}

module.exports = { errorHandler: new ErrorHandler() };