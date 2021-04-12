

export default (fastify, opts, next) => {
  fastify.get('/login', ({ body }) => {
    return { hello: 'world' }
  });

  next();
};
