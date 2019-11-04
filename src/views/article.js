const { ARTICLE_TOPICS } = require('../constants');

const getArticleListTemplate = articles => articles.map(({
  title,
  section,
  abstract,
  updated_date,
},
  index,
) => `
    <div class="article-list__container-card card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <div>${section}</div>
        <div>${abstract}</div>
        <div>${updated_date}</div>
        <button type="button" class="btn btn-primary" data-id="${index}">Details</button>
      </div>
    </div>
  `
)
  .join('');

const getArticleTopicsSelectTemplate = () => `
  <select class="article-list__select custom-select">${getArticleOptionsTemplate()}</select>  
`;

const getArticleInfoTemplate = ({
  title,
  section,
  abstract,
  des_facet,
  byline,
  url,
  published_date,
  updated_date,
}) => `
  <div>
    <h2>${title}</h2>
    <blockquote class="blockquote">
      <p class="mb-0">${section}</p>
      <footer class="blockquote-footer">${abstract}</footer>
    </blockquote>
    <div>
      <ul>
        ${getDesFacetTemplate(des_facet)}
      </ul>
    </div>
    <div class="lead">${byline}</div>
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