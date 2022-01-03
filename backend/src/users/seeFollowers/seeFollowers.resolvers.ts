import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (_, { username, take = 5, page }, { client }) => {
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
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: take,
          skip: (page - 1) * take,
        });
      const totalFollowers = await client.user.findMany({
        where: {
          following: {
            some: { username },
          },
        },
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers.length / 5),
      };
    },
  },
};

export default resolvers;
