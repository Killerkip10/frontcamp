const { ARTICLE_TOPICS } = require('../constants');

const getArticleListTemplate = ({ attributes, articles } = {}) => articles.map(({
  title,
  section,
  abstract,
  updated_date,
},
  index,
) => `
    <div ${attributes}>
      <div>${title}</div>
      <div>${section}</div>
      <div>${abstract}</div>
      <div>${updated_date}</div>
      <button data-id="${index}">Details</button>
    </div>
  `
)
  .join('');

const getArticleTopicsSelectTemplate = ({ attributes } = {}) => `
  <select ${attributes}>${getArticleOptionsTemplate()}</select>  
`;

const getArticleInfoTemplate = ({
  attributes,
  article: {
    title,
    section,
    abstract,
    des_facet,
    byline,
    url,
    published_date,
    updated_date,
  },
} = {}) => `
  <div ${attributes}>
    <div>${title}</div>
    <div>${section}</div>
    <div>${abstract}</div>
    <div>
      <ul>
        ${getDesFacetTemplate(des_facet)}
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

const getDesFacetTemplate = des_facet => des_facet.map(v => `<li>${v}</li>`).join('');

const getArticleOptionsTemplate = () => (
  Object.values(ARTICLE_TOPICS)
    .map(v => `<option value="${v}">${v}</option>`)
);

module.exports = {
  getArticleTopicsSelectTemplate,
  getArticleListTemplate,
  getArticleInfoTemplate,
};