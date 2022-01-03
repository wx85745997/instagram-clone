import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagArray = [];
        if (caption) {
          hashtagArray = processHashtags(caption);
        }
        return await client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagArray.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagArray,
              },
            }),
          },
        });
      }
    ),
  },
};

export default resolvers;
