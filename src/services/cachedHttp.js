const { httpService } = require('./http');

class CachedHttpService {
  #cachedRequests = [];

  async get(url, params) {
    const key = `get-${url}-${params}`;
    const cachedResponse = this.getCachedResponse(key);

    if (cachedResponse) {
      return cachedResponse.json;
    }

    const response = await httpService.get(url, params);

    this.addCachedResponse(key, response);

    return response;
  }

  getCachedResponse(key) {
    const cachedResponse = this.#cachedRequests.find(r => r.key === key);

    if (!cachedResponse) {
      return null;
    }

    if (cachedResponse.expireDate < new Date()) {
      this.#cachedRequests = this.#cachedRequests.filter(r => r.expireDate > new Date());
      return null;
    }

    return cachedResponse;
  }

  addCachedResponse(key, json) {
    const expireDate = new Date();

    expireDate.setMilliseconds(expireDate.getMilliseconds() + 10000);

    this.#cachedRequests.push({
      key,
      json,
      expireDate,
    });
  }
}

module.exports = { cachedHttpService: new CachedHttpService() };