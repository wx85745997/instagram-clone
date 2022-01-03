import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "That user does not exist.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              connect: {
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
