import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver(
      (_, { page, take = 5 }, { loggedInUser, client }) => {
        return client.photo.findMany({
          take,
          skip: (page - 1) * take,
          where: {
            OR: [
              {
                user: {
                  followers: {
                    some: {
                      id: loggedInUser.id,
                    },
                  },
                },
              },
              {
                userId: loggedInUser.id,
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
    ),
  },
};

export default resolvers;
