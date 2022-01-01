import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import schema ,{ typeDefs, resolvers } from './schema'
import { getUser } from './users/users.utils'
import logger from 'morgan'

const PORT = process.env.PORT;

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization)
        }
    }
})

const startServer = async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization)
        }
    },
    });
    await server.start();
  
    const app = express();
    app.use(logger('tiny'))
    app.use(graphqlUploadExpress());
    app.use('/static',express.static("uploads"))
    server.applyMiddleware({ app });
    await new Promise((anonymousFunction) => app.listen({ port: PORT }, anonymousFunction));
    console.log(`🚀 Apollo Server: http://localhost:${PORT}${server.graphqlPath}`);
  };


startServer();