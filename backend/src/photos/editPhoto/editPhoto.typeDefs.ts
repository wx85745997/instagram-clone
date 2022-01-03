import { gql } from "apollo-server";

export default gql`
  type editPhotoResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editPhoto(caption: String!, id: Int!): editPhotoResult
  }
`;
