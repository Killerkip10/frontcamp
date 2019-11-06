const { API, API_KEY } = require('../configs');
const { errorHandler } = require('../utils');

class HttpService {
  async get(url, params) {
      const response = await fetch(`${API.HOST}${url}?api-key=${API_KEY}&${params}`);

      if (!response.ok) {
        return errorHandler.handle(response);
      }

      return response.json();
  }
}

module.exports = { httpService: new HttpService() };