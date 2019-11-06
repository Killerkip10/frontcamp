(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"../../../services":24,"../../../utils":27,"../../../views":32,"../../component":10,"./actions":2}],2:[function(require,module,exports){
const GET_ARTICLE_INFO_REQUEST = 'GET_ARTICLE_INFO_REQUEST';
const GET_ARTICLE_INFO_SUCCESS = 'GET_ARTICLE_INFO_SUCCESS';
const GET_ARTICLE_INFO_FAILURE = 'GET_ARTICLE_INFO_FAILURE';

const getArticleInfoRequestAction = () => ({
  type: GET_ARTICLE_INFO_REQUEST,
  payload: { isFetching: true },
});

const getArticleInfoSuccessAction = article => ({
  type: GET_ARTICLE_INFO_SUCCESS,
  payload: { isFetching: false, article },
});

const getArticleInfoFailureAction = () => ({
  type: GET_ARTICLE_INFO_FAILURE,
  payload: { isFetching: false },
});

module.exports = {
  GET_ARTICLE_INFO_REQUEST,
  GET_ARTICLE_INFO_SUCCESS,
  GET_ARTICLE_INFO_FAILURE,
  getArticleInfoRequestAction,
  getArticleInfoSuccessAction,
  getArticleInfoFailureAction,
};
},{}],3:[function(require,module,exports){
module.exports = {
  ...require('./ArticleInfo'),
  ...require('./reducer'),
};
},{"./ArticleInfo":1,"./reducer":4}],4:[function(require,module,exports){
const {
  GET_ARTICLE_INFO_REQUEST,
  GET_ARTICLE_INFO_SUCCESS,
  GET_ARTICLE_INFO_FAILURE,
} = require('./actions');

const initialState = {
  isFetching: true,
  article: {
    title: '',
    section: '',
    abstract: '',
    des_facet: [],
    byline: '',
    url: '',
    published_date: '',
    updated_date: '',
    copyright: '',
  },
};

const articleInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLE_INFO_REQUEST:
    case GET_ARTICLE_INFO_SUCCESS:
    case GET_ARTICLE_INFO_FAILURE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

module.exports = { articleInfo };
},{"./actions":2}],5:[function(require,module,exports){
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
},{"../../../services":24,"../../../utils":27,"../../../views":32,"../../component":10,"./actions":6}],6:[function(require,module,exports){
const GET_ARTICLES_REQUEST = 'GET_ARTICLES_REQUEST';
const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';

const getArticlesRequestAction = () => ({
  type: GET_ARTICLES_REQUEST,
  payload: { isFetching: true, articles: [] },
});

const getArticlesSuccessAction = articles => ({
  type: GET_ARTICLES_SUCCESS,
  payload: { isFetching: false, articles },
});

const getArticlesFailureAction = () => ({
  type: GET_ARTICLES_FAILURE,
  payload: { isFetching: false },
});


module.exports = {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  getArticlesRequestAction,
  getArticlesSuccessAction,
  getArticlesFailureAction,
};
},{}],7:[function(require,module,exports){
module.exports = {
  ...require('./ArticleList'),
  ...require('./reducer'),
};
},{"./ArticleList":5,"./reducer":8}],8:[function(require,module,exports){
const {
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
} = require('./actions');

const initialState = {
  isFetching: true,
  articles: [],
};

const articleList = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ARTICLES_REQUEST:
    case GET_ARTICLES_SUCCESS:
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

module.exports = { articleList };
},{"./actions":6}],9:[function(require,module,exports){
const { component } = require('./component');

const Redirect = path => class {
  constructor({ router }) {
    router.push(path);
  }

  render() { }
};

module.exports = { Redirect: path => component(Redirect(path)) };
},{"./component":10}],10:[function(require,module,exports){
const component = Component => class {
  #component;
  #rerender;

  constructor({ router, ...rest }) {
     this.#component = new Component({ apply: this.apply, router, ...rest });
  }

  componentWillRender() {
    if (this.#component.componentWillRender) {
      this.#component.componentWillRender();
    }
  }

  componentWasRender() {
    if (this.#component.componentWasRender) {
      this.#component.componentWasRender();
    }
  }

  componentDidMount() {
    if (this.#component.componentDidMount) {
      this.#component.componentDidMount();
    }
  }

  componentWillUnmount() {
    if (this.#component.componentWillUnmount) {
      this.#component.componentWillUnmount();
    }
  };

  apply = () => {
    this.#rerender();
  };

  render() {
    this.componentWillRender();

    return this.#component.render();
  }

  updated() {
    this.componentWasRender();
  }

  destroy() {
    this.componentWillUnmount();
  }

  init = (rerender) => {
    this.#rerender = rerender;

    this.#rerender();
    this.componentDidMount();
  }
};

module.exports = { component };
},{}],11:[function(require,module,exports){
const API = {
  HOST: 'https://api.nytimes.com/',
  GET_ARTICLES: 'svc/topstories/v2/',
};

const API_KEY = '7wLat0smbCaZjbsMyErdSJqe8gn06EiC';

module.exports = {
  API,
  API_KEY,
};
},{}],12:[function(require,module,exports){
module.exports = {
  ...require('./api'),
};
},{"./api":11}],13:[function(require,module,exports){
const ARTICLE_TOPICS = {
  ARTS: 'arts',
  AUTOMOBILES: 'automobiles',
  BOOKS: 'books',
  BUSINESS: 'business',
  FASHION: 'fashion',
  FOOD: 'food',
  HEALTH: 'health',
  HOME: 'home',
  INSIDER: 'insider',
  MAGAZINE: 'magazine',
  MOVIES: 'movies',
  NATIONAL: 'national',
};

module.exports = { ARTICLE_TOPICS };
},{}],14:[function(require,module,exports){
const ERROR_COMPONENTS = {
  ERROR_401: 'Error401',
  ERROR_404: 'Error404',
  ERROR_500: 'Error500',
};

module.exports = { ERROR_COMPONENTS };
},{}],15:[function(require,module,exports){
module.exports = {
  ...require('./articleTopics'),
  ...require('./errorComponents'),
  ...require('./paths'),
};
},{"./articleTopics":13,"./errorComponents":14,"./paths":16}],16:[function(require,module,exports){
const PATHS = {
  ARTICLES: '/articles',
  ARTICLE_INFO: '/article',

  ERROR_401: '/Error401',
  ERROR_404: '/Error404',
  ERROR_500: '/Error500',
};

module.exports = { PATHS };
},{}],17:[function(require,module,exports){
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


},{"./components/Article/ArticleInfo":3,"./components/Article/ArticleList":7,"./components/Redirect":9,"./constants":15,"./router":18,"./utils":27}],18:[function(require,module,exports){
module.exports = {
  ...require('./router'),
};

},{"./router":19}],19:[function(require,module,exports){
class Router {
  static #instance;
  #routes = [];
  #rootElement;
  #component;
  #params;

  constructor(id) {
    this.#rootElement = document.getElementById(id);

    window.addEventListener('hashchange', this.initComponent, false);

    return this;
  }

  static getInstance(id) {
     if (!this.#instance) {
       this.#instance = new Router(id);
     }

     return this.#instance;
  }

  get params() {
    return this.#params.slice(1);
  }

  init() {
    this.initComponent();

    return this;
  }

  add(path, component) {
    const pathRegExp = new RegExp('^' + path.replace(/:[^\s/]+/g, '([\\w-]+)') + '$');

    this.#routes.push({
      pathRegExp,
      component,
    });

    return this;
  }

  push(path) {
    const route = this._getRouteByPath(path);

    if (route) {
      location.hash = path;
    }

    return this;
  }

  initComponent = () => {
    const path = location.hash.slice(1);
    const route = this._getRouteByPath(path);

    if (!route) {
      return;
    }

    if (this.#component) {
      this.#component.destroy();
    }

    this.#params = this._getParamsByPath(route.pathRegExp, path);

    this.#component = new route.component({ router: this });
    this.#component.init(this.render);
  };

  render = () => {
    this.#rootElement.innerHTML = this.#component.render();
    this.#component.updated();
  };

  _getRouteByPath(path) {
    return this.#routes.find(r => path.match(r.pathRegExp));
  }

  _getParamsByPath(pathRegExp, path) {
    return path.match(pathRegExp);
  }
}

module.exports = { Router };
},{}],20:[function(require,module,exports){
const { httpService } = require('./http');
const { API } = require('../configs');

const getArticlesByTopic = async (topic) => {
  const { results } = await httpService.get(`${API.GET_ARTICLES}${topic}.json`);

  return results;
};

const getArticleById = async (topic, articleId) => {
  const { results, copyright } = await httpService.get(`${API.GET_ARTICLES}${topic}.json`);

  const article = results.find((_, index) => index === Number(articleId));

  return article ? { ...article, copyright } : {};
};

module.exports = {
  getArticlesByTopic,
  getArticleById,
};
},{"../configs":12,"./http":23}],21:[function(require,module,exports){
const { httpService } = require('./http');

class CachedHttpService {
  #cachedRequests = [];

  async get(url, params) {
    const key = `get-${url}-${params}`;
    const cachedResponse = this.getCachedResponse(key);

    if (cachedResponse) {
      return cachedResponse.json;
    }

    const response = await httpService.get(url, params);

    this.addCachedResponse(key, response);

    return response;
  }

  getCachedResponse(key) {
    const cachedResponse = this.#cachedRequests.find(r => r.key === key);

    if (!cachedResponse) {
      return null;
    }

    if (cachedResponse.expireDate < new Date()) {
      this.#cachedRequests = this.#cachedRequests.filter(r => r.expireDate > new Date());
      return null;
    }

    return cachedResponse;
  }

  addCachedResponse(key, json) {
    const expireDate = new Date();

    expireDate.setMilliseconds(expireDate.getMilliseconds() + 10000);

    this.#cachedRequests.push({
      key,
      json,
      expireDate,
    });
  }
}

module.exports = { cachedHttpService: new CachedHttpService() };
},{"./http":23}],22:[function(require,module,exports){
class Error401 {
  status = 401;
  message = 'Not authorized';

  handle() {
    console.log(this.message);
  }
}

class Error404 {
  status = 404;
  message = 'Not found';

  handle() {
    console.log(this.message);
  }
}

class Error500 {
  status = 500;
  message = 'Server error';

  handle() {
    console.log(this.message);
  }
}

class ErrorFactory {
  create(status, ex) {
    switch (status) {
      case 401:
        return new Error401(ex);
      case 404:
        return new Error404(ex);
      case 500:
        return new Error500(ex);
      default:
        return null;
    }
  }
}

class ErrorHandler {
  #handlersList = [];
  #errorFactory = new ErrorFactory();

  handle(ex) {
    const { status } = ex;

    const errorHandler = this.getHandlerByStatus(status);

    if (errorHandler) {
      errorHandler.handle(ex);
    }

    return Promise.reject(ex);
  }

  getHandlerByStatus(status) {
    const handler = this.get(status);

    if (handler) {
      return handler;
    }

    const errorHandler = this.#errorFactory.create(status);

    if (errorHandler) {
      this.add(errorHandler);
    }

    return errorHandler;
  }

  add(obj) {
    this.#handlersList.push(obj);
  }

  get(key) {
    return this.#handlersList.find(({ status }) => status === key);
  }
}

module.exports = { errorHandler: new ErrorHandler() };
},{}],23:[function(require,module,exports){
const { errorHandler } = require('./errorHandler');
const { LazyLoading } = require('./lazyLoading');
const { API, API_KEY } = require('../configs');
const { Router } = require('../router');
const { ERROR_COMPONENTS, PATHS } = require('../constants');

class HttpService {
  #lazyLoading = new LazyLoading();

  async get(url, params) {
      const response = await fetch(`${API.HOST}${url}?api-key=${API_KEY}&${params}`);

      if (!response.ok) {
        this.handleError(response.status);
        return errorHandler.handle(response);
      }

      return response.json();
  }

  handleError(status) {
    switch (status) {
      case 401:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_401,
          PATHS.ERROR_401,
          () => Router.getInstance().push(PATHS.ERROR_401),
        );
        break;
      case 404:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_404,
          PATHS.ERROR_404,
          () => Router.getInstance().push(PATHS.ERROR_404),
          );
        break;
      case 500:
        this.#lazyLoading.load(
          ERROR_COMPONENTS.ERROR_500,
          PATHS.ERROR_500,
          () => Router.getInstance().push(PATHS.ERROR_500),
        );
        break;
    }
  }
}

module.exports = { httpService: new HttpService() };
},{"../configs":12,"../constants":15,"../router":18,"./errorHandler":22,"./lazyLoading":25}],24:[function(require,module,exports){
module.exports = {
  ...require('./article'),
  ...require('./http'),
  ...require('./cachedHttp'),
};
},{"./article":20,"./cachedHttp":21,"./http":23}],25:[function(require,module,exports){
const { Router } = require('../router');
const { ERROR_COMPONENTS } = require('../constants');

class LazyLoading {
  load(componentName, path, cb) {
    const component = this.getComponentByName(componentName);

    if (component) {
      cb();
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `./${componentName}.js`;

    script.onload = () => {
      Router.getInstance().add(path, this.getComponentByName(componentName));
      cb();
    };

    document.head.appendChild(script);
  }

  getComponentByName(componentName) {
    switch (componentName) {
      case ERROR_COMPONENTS.ERROR_401:
        return window[ERROR_COMPONENTS.ERROR_401];
      case ERROR_COMPONENTS.ERROR_404:
        return window[ERROR_COMPONENTS.ERROR_404];
      case ERROR_COMPONENTS.ERROR_500:
        return window[ERROR_COMPONENTS.ERROR_500];
    }
  }
}

module.exports = { LazyLoading };
},{"../constants":15,"../router":18}],26:[function(require,module,exports){
const { Store } = require('./redux');

const connector = Component => function(props) {
  const store = Store.getInstance();
  const state = store.getState();
  const { dispatch, subscribe } = store;

  return new Component({ ...props, state, dispatch, subscribe });
};

module.exports = { connector };
},{"./redux":28}],27:[function(require,module,exports){
module.exports = {
  ...require('./subject'),
  ...require('./redux'),
  ...require('./connector'),
  ...require('./utils'),
};
},{"./connector":26,"./redux":28,"./subject":29,"./utils":30}],28:[function(require,module,exports){
const { Subject } = require('./subject');

class Store {
  static #instance;
  #reducers;
  #state = {};
  #stateSubject = new Subject();

  constructor(reducers) {
    this.#reducers = Object.entries(reducers);

    this.dispatch({});
  }

  static getInstance(...params) {
    if (!this.#instance) {
      this.#instance = new Store(...params);
    }

    return this.#instance;
  }

  getState = () => {
    return this.#state;
  };

  dispatch = (action) => {
    this.#reducers.forEach(([key, reducer]) => this.#state[key] = reducer(this.#state[key], action));
    this.#stateSubject.next();
  };

  subscribe = (cb) => {
    this.#stateSubject.subscribe(cb);

    return { unsubscribe: this.#stateSubject.unsubscribe };
  };
}

module.exports = { Store };
},{"./subject":29}],29:[function(require,module,exports){
class Subject {
  #listeners = [];

  subscribe = (cb) => {
    this.#listeners.push(cb);

    return { unsubscribe: () => this.unsubscribe(cb) };
  };

  next = (v) => {
    this.#listeners.forEach(cb => cb(v));
  };

  unsubscribe = (cb) => {
    this.#listeners = this.#listeners.filter(func => func !== cb);
  };
}

module.exports = { Subject };

},{}],30:[function(require,module,exports){
const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg);

module.exports = { compose };

},{}],31:[function(require,module,exports){
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
},{"../constants":15}],32:[function(require,module,exports){
module.exports = {
  ...require('./article'),
};
},{"./article":31}]},{},[17]);
