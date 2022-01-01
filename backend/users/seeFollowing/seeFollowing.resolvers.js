import client from "../../client";
export default {
  Query: {
    seeFollowing: async (_, { username, lastId, take = 5 }) => {
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
          ...(lastId && { cursor: { id } }),
        });
      return {
        ok: true,
        following,
      };
    },
  },
};
