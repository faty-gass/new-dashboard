import users from './users.js';
import auth from './auth.js';

export default fastify => {
  fastify.register(users, { prefix: '/users' }); 
  fastify.register(auth, { prefix: '/auth' });


  fastify.get('/', async (request, reply) => {
    return { message: 'Welcome to the dashboard API !!' }
  })
};