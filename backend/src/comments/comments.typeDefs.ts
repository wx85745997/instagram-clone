import { gql } from "apollo-server"
export default gql`
  type comments {
    id: Int!
    createdAt: String!
    updateAt: String!
    user: User!
    photo: Photo!
    payload: String!
    isMine: Boolean!
  }
`
