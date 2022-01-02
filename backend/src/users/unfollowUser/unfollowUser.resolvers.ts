import { protectedResolver } from "../users.utils";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Mutation: {
    unFollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "Cant unfollow user",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
