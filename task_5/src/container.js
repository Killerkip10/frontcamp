const { createContainer, asFunction, asValue } = require('awilix');

const { app, methods } = require('./app');
const storages = require('./infra/storages');
const mappers = require('./infra/mappers');
const logger = require('./infra/logger');
const server = require('./interfaces/http');
const config = require('../config');

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  methods: asFunction(methods).singleton(),
  storages: asFunction(storages).singleton(),
  mappers: asFunction(mappers).singleton(),
  server: asFunction(server).singleton(),
  logger: asFunction(logger).singleton(),
  config: asValue(config),
});

module.exports = container;