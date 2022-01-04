import { Resolvers } from "../../types"
const resolvers: Resolvers = {
  Query: {
    seePhotoComment: (_, { id, page, take = 5 }, { client }) =>
      client.photo
        .findUnique({
          where: {
            id
          },
        })
        .comments({
          skip: (page - 1) * take,
          take,
        }),
  },
}

export default resolvers
