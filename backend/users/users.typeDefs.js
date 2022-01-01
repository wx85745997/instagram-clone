import { gql } from "apollo-server";
export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updateAt: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
