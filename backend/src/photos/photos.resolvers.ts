import client from "../client";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    likes: ({ id }, _, { client, loggedInUser }) =>
      client.like.count({
        where: { photoId: id },
      }),
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
  Hashtag: {
    photos: ({ id }, { page, take = 5 }) =>
      client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos({
          take,
          skip: (page - 1) * take,
        }),
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
