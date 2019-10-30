const { component } = require('./component');
const { getArticleById } = require('../services');
const { getArticleInfoTemplate } = require('../views');

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

  constructor({ apply, router }) {
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

  render = () => (`
    <div class="article-info">     
      <div>
        ${getArticleInfoTemplate(this.#article)}
      </div>
      
      <div>
        ${this.#article.copyright}
      </div>

      <div>
        <a class="btn btn-outline-primary" onclick="history.back()" href="#">Back</a>
      </div>
    </div>
  `);
}

module.exports = { ArticleInfo: component(ArticleInfo) };