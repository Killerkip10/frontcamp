const { ARTICLE_TOPICS } = require('../constants');
const { getArticlesByTopic } = require('../services');

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

  getOptionsTemplate = () => (
    Object.values(ARTICLE_TOPICS)
      .map(v => `<option value="${v}">${v}</option>`)
  );

  getArticlesTemplate = () => this.#articles.map(({
      title,
      section,
      abstract,
      updated_date,
    },
      index,
    ) => `
      <div class="article-list__container-card">
        <div>${title}</div>
        <div>${section}</div>
        <div>${abstract}</div>
        <div>${updated_date}</div>
        <button data-id="${index}">Details</button>
      </div>
    `
  )
    .join('');

  render = () => (`
    <div>
      <select class="article-list__select">${this.getOptionsTemplate()}</select>  
      
      <div class="article-list__container">${this.getArticlesTemplate()}</div>
      ${this.#isFetching ? '...Loading' : ''}
    </div>
  `);
}

module.exports = { ArticleList };