import * as auth from '../controllers/auth.js'

export default (fastify, opts, next) => {
  fastify.post('/register',( request, reply) =>  auth.signup(request, reply));
  fastify.post('/login', (request, reply) =>  auth.signin(request, reply));
  fastify.get('/profile', { preHandler : fastify.auth([fastify.jwtVerify])}, (request, reply) => auth.getUser(request, reply))

  next();
};