import { ApolloServer, gql } from 'apollo-server'
import schema from './schema.js'

const server = new ApolloServer({
    schema
})

server.listen().then(() => console.log("4000"))