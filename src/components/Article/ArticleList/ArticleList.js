const {
  getArticlesRequestAction,
  getArticlesSuccessAction,
  getArticlesFailureAction,
} = require('./actions');
const { component } = require('../../component');
const { connector, compose } = require('../../../utils');
const { getArticlesByTopic } = require('../../../services');
const { getArticleTopicsSelectTemplate, getArticleListTemplate } = require('../../../views');

class ArticleList {
  #router;
  #state;
  #dispatch;
  #subscription;

  #selectElement;
  #containerCardElement;

  constructor({ apply, router, state, dispatch, subscribe }) {
    this.#router = router;
    this.#state = state;
    this.#dispatch = dispatch;

    this.#subscription = subscribe(apply);
  }

  componentDidMount = async () => {
    const [topic] = this.#router.params;

    try {
      this.#dispatch(getArticlesRequestAction());
      const articles = await getArticlesByTopic(topic);
      this.#dispatch(getArticlesSuccessAction(articles));
    } catch (e) {
      this.#dispatch(getArticlesFailureAction());
      console.error(e);
    }
  };

  componentWillRender = () => {
    if (this.#selectElement) {
      this.#selectElement.removeEventListener('change', this.handleSelectChange);
    }
    if (this.#containerCardElement) {
      this.#selectElement.removeEventListener('click', this.handleDetailsButtonClick);
    }
  };

  componentWasRender = () => {
    const [topic] = this.#router.params;

    [this.#selectElement] = document.getElementsByClassName('article-list__select');
    [this.#containerCardElement] = document.getElementsByClassName('article-list__container');

    this.#selectElement.value = topic;
    this.#selectElement.addEventListener('change', this.handleSelectChange);
    this.#containerCardElement.addEventListener('click', this.handleDetailsButtonClick);
  };

  componentWillUnmount = () => {
    this.#selectElement.removeEventListener('change', this.handleSelectChange);
    this.#selectElement.removeEventListener('click', this.handleDetailsButtonClick);
    this.#subscription.unsubscribe();
  };

  handleSelectChange = ({ target: { value } }) => this.#router.push(`/articles/${value}`);

  handleDetailsButtonClick = ({ target: { dataset } }) => {
    if (dataset.id) {
      const [topic] = this.#router.params;

      this.#router.push(`/article/${topic}/${dataset.id}`);
    }
  };

  render = () => {
    const { articleList: { articles, isFetching } } = this.#state;

    return `
      <div class="article-list">
        <div>
          ${getArticleTopicsSelectTemplate()}
        </div>
        
        <div class="article-list__container">
          ${getArticleListTemplate(articles)}
        </div>
        
        ${isFetching ? '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>' : ''}
      </div>
    `;
  };
}

module.exports = {
  ArticleList: compose(component, connector)(ArticleList),
};