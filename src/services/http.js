const { API, API_KEY } = require('../configs');
const { Singleton } = require('../utils');

class HttpService {
  async get(url, params) {
    const response = await fetch(`${API.HOST}${url}?api-key=${API_KEY}&${params}`);

    return response.json();
  }
}

module.exports = { HttpService: new Singleton(HttpService) };