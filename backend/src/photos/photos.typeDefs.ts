import { gql } from "apollo-server";
export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    createdAt: String!
    updateAt: String!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    isMine: Boolean!
    comments:Int!
  }
  type Hashtag {
    id: String!
    hashtag: String!
    photos(page: Int!, take: Int): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updateAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updateAt: String!
  }
`;
