const { Router } = require('./router');
const { ArticleList, ArticleInfo } = require('./components');

const router = new Router('app')
  .add('/articles/:topic', ArticleList)
  .add('/article/:topic/:id', ArticleInfo)
  .init();

button1.addEventListener('click', () => router.push('/articles/books'));
button2.addEventListener('click', () => router.push('/article/books/10'));