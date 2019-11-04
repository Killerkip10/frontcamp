const { Router } = require('./router');
const { Store } = require('./utils');
const { Redirect } = require('./components/Redirect');
const { ArticleList, articleList } = require('./components/Article/ArticleList');
const { ArticleInfo, articleInfo } = require('./components/Article/ArticleInfo')

const [headerElement] = document.getElementsByClassName('header__info');

const store = Store.getInstance({ articleList, articleInfo });

store.subscribe(() => console.log(store.getState()));
store.subscribe(() => headerElement.innerHTML = store.getState()
  .articleList
  .articles
  .length
);

const router = new Router('app')
  .add('/articles/:topic', ArticleList)
  .add('/article/:topic/:id', ArticleInfo)
  .add('', Redirect('/articles/books'))
  .init();

