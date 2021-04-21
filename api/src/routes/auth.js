import * as auth from '../controllers/auth.js'

export default (fastify, opts, next) => {
  fastify.post('/register', ( request, reply) =>  auth.signup(request, reply));
  fastify.post('/signin', ({ body }) =>  auth.signin(body));

  next();
};