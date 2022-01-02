import { gql } from "apollo-server";
export default gql`
  type seeFollowingQuery {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int, take: Int): seeFollowingQuery!
  }
`;
