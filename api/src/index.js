import Fastify from 'fastify'
import dotenv from 'dotenv'
import * as db from './db-connect.js'
import fastifyJwt from 'fastify-jwt'
import fastifyAuth from 'fastify-auth'

import routes from './routes/index.js';
import decorator from './decorator.js'

dotenv.config()

// Instantiate fastify
const fastify = Fastify({
  maxParamLength: 512,
  bodyLimit: 1048576 * 10,
  ignoreTrailingSlash: true,
  disableRequestLogging: true,
  logger: {
    prettyPrint: {
      translateTime: true
    }
  }
});

//Plugins
fastify.register(db)
fastify.register(fastifyJwt,{secret : process.env.JWT_SECRET})
fastify.register(fastifyAuth)
fastify.register(
  (instance, opts, done) => {
    decorator(instance);
    routes(instance);
    done();
  },
  {
    prefix: '/api'
  }
);


//fastify.get('/', (req, res) => res.redirect(webappUrl));

//Run the server
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})