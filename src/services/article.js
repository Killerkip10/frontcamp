const { HttpService } = require('./http');
const { API } = require('../configs');

const getArticlesByTopic = async (topic) => {
  const { results } = await HttpService
    .getInstance()
    .get(`${API.GET_ARTICLES}${topic}.json`);

  return results;
};

const getArticleById = async (topic, articleId) => {
  const { results, copyright } = await HttpService
    .getInstance()
    .get(`${API.GET_ARTICLES}${topic}.json`);

  const article = results.find((_, index) => index === Number(articleId));

  return article ? { ...article, copyright } : {};
};

module.exports = {
  getArticlesByTopic,
  getArticleById,
};