const { Store } = require('./redux');

const connector = Component => function(props) {
  const store = Store.getInstance();
  const state = store.getState();
  const { dispatch, subscribe } = store;

  return new Component({ ...props, state, dispatch, subscribe });
};

module.exports = { connector };