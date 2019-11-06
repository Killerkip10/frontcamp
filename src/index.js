const { Router } = require('./router');
const { Store } = require('./utils');
const { PATHS } = require('./constants');

const { Redirect } = require('./components/Redirect');
const { ArticleList, articleList } = require('./components/Article/ArticleList');
const { ArticleInfo, articleInfo } = require('./components/Article/ArticleInfo');

const [headerElement] = document.getElementsByClassName('header__info');

const store = Store.getInstance({ articleList, articleInfo });

store.subscribe(() => console.log(store.getState()));
store.subscribe(() => headerElement.innerHTML = store.getState()
  .articleList
  .articles
  .length
);

Router.getInstance('app')
  .add(`${PATHS.ARTICLES}/:topic`, ArticleList)
  .add(`${PATHS.ARTICLE_INFO}/:topic/:id`, ArticleInfo)
  .add('', Redirect(`${PATHS.ARTICLES}/books`))
  .init();

