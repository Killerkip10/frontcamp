const Status = require('http-status');
const { Router } = require('express');

module.exports = ({
  logger,
  getListUseCase,
  getItemUseCase,
  postUseCase,
  deleteUseCase,
  putUseCase,
}) => {
  const router = Router();

  router.get('/', (req, res) => getListUseCase
    .all()
    .then(data => res.send(data))
    .catch((error) => {
      logger.error(error);
      res.status(Status.BAD_REQUEST).send(error.message);
    })
  );

  router.get('/:id', (req, res) => getItemUseCase
    .byId(req.params.id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.sendStatus(Status.NOT_FOUND);
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(Status.BAD_REQUEST).send(error.message);
    })
  );

  router.delete('/:id', (req, res) => deleteUseCase
    .remove(req.params.id)
    .then(() => res.sendStatus(Status.OK))
    .catch((error) => {
      logger.error(error);
      res.status(Status.BAD_REQUEST).send(error.message);
    })
  );

  router.post('/', (req, res) => postUseCase
    .create({ ...req.body, authorId: req.session.passport.user.profile.id })
    .then(data => res.status(Status.CREATED).send(data))
    .catch((error) => {
      logger.error(error);
      res.status(Status.BAD_REQUEST).send(error.message);
    })
  );

  router.put('/:id', (req, res) => putUseCase
    .update(req.params.id, req.body)  
    .then(data => res.status(Status.OK).send(data))
    .catch((error) => {
      logger.error(error);
      res.status(Status.BAD_REQUEST).send(error.message);
    }) 
  );

  return router;
};