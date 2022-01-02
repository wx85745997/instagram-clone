import { Resolvers } from "../types";
const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId, take = 5 }, { client }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
export default resolvers;
