const {
  getArticleInfoRequestAction,
  getArticleInfoSuccessAction,
  getArticleInfoFailureAction,
} = require('./actions');
const { component } = require('../../component');
const { connector, compose } = require('../../../utils');
const { getArticleById } = require('../../../services');
const { getArticleInfoTemplate } = require('../../../views');

class ArticleInfo {
  #router;
  #state;
  #dispatch;
  #subscription;

  constructor({ apply, router, state, dispatch, subscribe }) {
    this.#router = router;
    this.#state = state;
    this.#dispatch = dispatch;

    this.#subscription = subscribe(apply);
  }

  componentDidMount = async () => {
    const [topic, articleId] = this.#router.params;

    try {
      this.#dispatch(getArticleInfoRequestAction());
      const article = await getArticleById(topic, articleId);
      this.#dispatch(getArticleInfoSuccessAction(article));
    } catch (e) {
      this.#dispatch(getArticleInfoFailureAction());
      console.error(e);
    }
  };

  render = () => {
    const { articleInfo: { article, isFetching } } = this.#state;

    return `
      <div class="article-info">     
         ${isFetching ? '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>' : ''}
         
        <div>
          ${getArticleInfoTemplate(article)}
        </div>
        
        <div>
          ${article.copyright}
        </div>
  
        <div>
          <a class="btn btn-outline-primary" onclick="history.back()" href="#">Back</a>
        </div>
      </div>
    `;
  };
}

module.exports = {
  ArticleInfo: compose(component, connector)(ArticleInfo),
};