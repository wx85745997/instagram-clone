import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) null;
    const { id }: any = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "please log in to perform this action",
      };
    }
    return resolver(root, args, context, info);
  };
