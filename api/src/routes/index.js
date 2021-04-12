import users from './users.js';

export default fastify => {
  fastify.register(users, { prefix: '/users' });
};