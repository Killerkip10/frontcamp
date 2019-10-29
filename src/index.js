const { Router } = require('./router');
const { ArticleList, ArticleInfo, Redirect } = require('./components');

const router = new Router('app')
  .add('/articles/:topic', ArticleList)
  .add('/article/:topic/:id', ArticleInfo)
  .add('', Redirect('/articles/books'))
  .init();
