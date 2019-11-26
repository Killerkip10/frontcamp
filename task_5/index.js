// const { app, container } = require('./src/container');

// console.log(container.resolve('test'));
// app.start();
const container = require('./src/container');

container
  .resolve('app')
  .start();
// app.start();