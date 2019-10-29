const { component } = require('./component');

const Redirect = path => class {
  constructor({ router }) {
    router.push(path);
  }

  render() { }
};

module.exports = { Redirect: path => component(Redirect(path)) };