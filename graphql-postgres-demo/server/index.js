const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { sequelize } = require('./database');

// Load environment variables
dotenv.config();

async function startServer() {
  // Initialize Express
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can add authentication logic here
      return { req };
    },
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        path: error.path,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Connect to the database
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  // Start the server
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => {
  console.error('Error starting server:', err);
});
