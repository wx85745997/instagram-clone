import { gql } from "apollo-server";

export default gql`
  type Query {
    seeFeed(take: Int, page: Int!): [Photo]
  }
`;
