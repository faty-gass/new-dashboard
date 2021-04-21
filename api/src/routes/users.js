import * as users from '../controllers/users.js'

export default (fastify, opts, next) => {
  fastify.get('/test', ({ body }) =>  users.hello());

  next();
};
