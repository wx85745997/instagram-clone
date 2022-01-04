
import { gql } from "apollo-server";

export default gql`
  type Query {
    seePhotoComment(id: Int!,page:Int!,take:Int ): [comments]
  }
`;
