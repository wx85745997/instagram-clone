import { gql } from "apollo-server";
export default gql`
  type User {
    id: Int!
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
    totalFollowers: Int!
    totalFollowing: Int!
    photos: [Photo]
    isFollowing: Boolean!
    isMe: Boolean!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;
