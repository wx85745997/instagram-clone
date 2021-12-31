import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer, gql } from 'apollo-server'
import schema ,{ typeDefs, resolvers } from './schema'
import { getUser } from './users/users.utils'


const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization)
        }
    }
})
const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`server in running on http://localhost:${PORT}`))