import * as users from '../controllers/users.js'

export default (fastify, opts, next) => {
  fastify.get('/', { preHandler : fastify.auth([fastify.jwtVerify, fastify.isAdmin], { relation : 'and'})}, (req, res) =>  users.listUsers(req, res));
  fastify.patch('/:userId', { preHandler : fastify.auth([fastify.jwtVerify])}, (req, res) =>  users.updateUser(req, res));
  fastify.patch('/:userId/password', { preHandler : fastify.auth([fastify.jwtVerify])}, (req, res) =>  users.updatePwd(req, res));
  fastify.patch('/:userId/role', { preHandler : fastify.auth([fastify.jwtVerify, fastify.isAdmin], { relation : 'and'})},(req, res) =>  users.updateRole(req, res));
  fastify.delete('/:userId', { preHandler : fastify.auth([fastify.jwtVerify])}, (req, res) =>  users.deleteUser(req, res));

  next();
};
