const { component } = require('./component');
const { getArticlesByTopic } = require('../services');
const { getArticleTopicsSelectTemplate, getArticleListTemplate } = require('../views');

class ArticleList {
  #apply;
  #router;

  #articles = [];
  #isFetching = true;

  #selectElement;
  #containerCardElement;

  constructor({ apply, router }) {
    this.#apply = apply;
    this.#router = router;
  }

  componentDidMount = async () => {
    const [topic] = this.#router.params;

    try {
      this.#articles = await getArticlesByTopic(topic);
    } catch (e) {
      console.error(e);
    } finally {
      this.#isFetching = false;
      this.#apply();
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
  };

  handleSelectChange = ({ target: { value } }) => this.#router.push(`/articles/${value}`);

  handleDetailsButtonClick = ({ target: { dataset } }) => {
    if (dataset.id) {
      const [topic] = this.#router.params;

      this.#router.push(`/article/${topic}/${dataset.id}`);
    }
  };

  render = () => (`
    <div>
      <div>
        ${getArticleTopicsSelectTemplate({ attributes: 'class="article-list__select"' })}
      </div>
      
      <div class="article-list__container">
        ${getArticleListTemplate({ attributes: 'class="article-list__container-card"', articles: this.#articles })}
      </div>
      
      ${this.#isFetching ? '...Loading' : ''}
    </div>
  `);
}

module.exports = { ArticleList: component(ArticleList) };