const { Router } = require('./router');
const { ArticleList, ArticleInfo } = require('./components');

const router = new Router('app')
  .add('/articles/:topic', ArticleList)
  .add('/article/:topic/:id', ArticleInfo)
  .init();

articlesButton.addEventListener('click', () => router.push('/articles/books'));