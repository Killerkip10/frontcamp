const { httpService } = require('./http');
const { cachedHttpService } = require('./cachedHttp');
const { API } = require('../configs');

const getArticlesByTopic = async (topic) => {
  const { results } = await cachedHttpService.get(`${API.GET_ARTICLES}${topic}.json`);

  return results;
};

const getArticleById = async (topic, articleId) => {
  const { results, copyright } = await httpService.get(`${API.GET_ARTICLES}${topic}.json`);

  const article = results.find((_, index) => index === Number(articleId));

  return article ? { ...article, copyright } : {};
};

module.exports = {
  getArticlesByTopic,
  getArticleById,
};