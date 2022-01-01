import { gql } from "apollo-server";
export default gql`
  type seeFollowersQuery {
    ok: Boolean!
    error: String
    followers: [User]
    totalPage: Int
  }
  type Query {
    seeFollowers(username: String!, page: Int!, take: Int): seeFollowersQuery!
  }
`;
