import jwt from 'jsonwebtoken'

export default (fastify) => {
  fastify.decorate('jwtVerify', async (req, reply, done) => {
    let isAuthorized = false;
    const { authorization } = req.headers;
    if (authorization && typeof authorization === 'string') {
      const [, token] = authorization.split(' ');

      const tokenData = jwt.verify(token, process.env.JWT_SECRET)
      if (tokenData) {
        req.tokenData = tokenData;
        isAuthorized = true;
        return done()
      }
    }

    if (!isAuthorized) {
      reply.status(401);
      throw new Error('You are not authorized');
    }

    done("You need to be logged in !")
  });
};