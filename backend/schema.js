import { loadFilesSync, makeExecutableSchema, mergeTypeDefs, mergeResolves } from "graphql-tools"
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDef.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolves(loadedResolvers);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema