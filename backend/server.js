import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer, gql } from 'apollo-server'
import schema from './schema'
import { getUser ,protecResolver} from './users/users.utils'


const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.authorization),
            protecResolver
        }
    }
})
const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`server in running on http://location:${PORT}`))