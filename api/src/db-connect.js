import fastifyPlugin from 'fastify-plugin'
import mongoose from 'mongoose';

export default async function dbConnector () {
  mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    // autoReconnect: true,
    // reconnectTries: 1000000,
    // reconnectInterval: 3000
  })

  mongoose.connection.on('connected', () => {
    console.log(`Database successfully connected to ${process.env.DB_URI}`);
  });
  
  mongoose.connection.on('reconnected', () => {
    console.log(`Database successfully reconnected to ${process.env.DB_URI}`);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Connection Disconnected');
  });
  
  mongoose.connection.on('close', () => {
    console.log('Connection Closed');
  });
  
  mongoose.connection.on('error', (error) => {
    console.error(error);
  });
  
  mongoose.set('useFindAndModify', false);
}

// Wrapping a plugin function with fastify-plugin exposes the decorators    
// and hooks, declared inside the plugin to the parent scope.
//module.exports = fastifyPlugin(dbConnector)
