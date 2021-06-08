import jwt from 'jsonwebtoken'

export default (fastify) => {
  // checks if token is sent and valid
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
  })

  //limit access only to admin  
  fastify.decorate('isAdmin', async (req, reply, done) => {
    const { authorization } = req.headers;
    if (authorization && typeof authorization === 'string') {
      const [, token] = authorization.split(' ');

      const tokenData = jwt.verify(token, process.env.JWT_SECRET)
      if (tokenData?.role === 'admin') {
        return done()
      } else {
        reply.status(403);
        throw new Error("You need to be admin to access this resource");
      }
    }
    done("You need to be logged in !")
  })
};