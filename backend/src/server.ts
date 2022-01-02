import * as dotenv from "dotenv";
dotenv.config({ path: process.cwd() + "/.env" });
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import schema, { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import * as logger from "morgan";
import client from "./client";

const PORT: string | number = process.env.PORT || 4000;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client,
      };
    },
  });
  await server.start();
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));
  server.applyMiddleware({ app });
  await new Promise((resolve: any) => {
    app.listen({ port: PORT }, resolve);
  });
  console.log(
    `🚀 Apollo Server: http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
