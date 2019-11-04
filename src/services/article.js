const { API, API_KEY } = require('../configs');

const getArticlesByTopic = async (topic) => {
  const response = await fetch(`${API.HOST}${API.GET_ARTICLES}${topic}.json?api-key=${API_KEY}`);
  const { results } = await response.json();

  return results;
};

const getArticleById = async (topic, articleId) => {
  const response = await fetch(`${API.HOST}${API.GET_ARTICLES}${topic}.json?api-key=${API_KEY}`);
  const { results, copyright } = await response.json();

  const article = results.find((_, index) => index === Number(articleId));

  return article ? { ...article, copyright } : {};
};

module.exports = {
  getArticlesByTopic,
  getArticleById,
};