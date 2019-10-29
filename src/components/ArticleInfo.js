const { getArticleById } = require('../services');

class ArticleInfo {
  #apply;
  #router;

  #article = {
    title: '',
    section: '',
    abstract: '',
    des_facet: [],
    byline: '',
    url: '',
    published_date: '',
    updated_date: '',
    copyright: '',
  };
  #isFetching = true;

  constructor({apply, router}) {
    this.#apply = apply;
    this.#router = router;
  }

  componentDidMount = async () => {
    const [topic, articleId] = this.#router.params;

    try {
      this.#article = await getArticleById(topic, articleId);
    } catch (e) {
      console.error(e);
    } finally {
      this.#isFetching = false;
      this.#apply();
    }
  };

  getDesFacetTemplate = des_facet => des_facet.map(v => `<li>${v}</li>`).join('');

  getArticleTemplate = () => {
    const {
      title,
      section,
      abstract,
      des_facet,
      byline,
      url,
      published_date,
      updated_date,
    } = this.#article;

    return `
      <div>
        <div>${title}</div>
        <div>${section}</div>
        <div>${abstract}</div>
        <div>
          <ul>
            ${this.getDesFacetTemplate(des_facet)}
          </ul>
        </div>
        <div>${byline}</div>
        <div>
          <a href="${url}">${url}</a>
        </div>
        <div>${published_date}</div>
        <div>${updated_date}</div>
      </div>
    `;
  };

  render = () => (`
    <div>
      <div>
        <a onclick="history.back()" href="#">Back</a>
       </div>
       
       <div>
        ${this.getArticleTemplate()}
      </div>
      
      <div>${this.#article.copyright}</div>
    </div>
  `);
}

module.exports = { ArticleInfo };