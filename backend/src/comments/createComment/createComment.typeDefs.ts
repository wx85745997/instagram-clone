import { gql } from "apollo-server"
export default gql`
    type createCommentResult {
      ok: Boolean!
      error:String
    }
  type Mutation   {
    createComment(payload: String!, photoId: Int!): createCommentResult
  }
 `