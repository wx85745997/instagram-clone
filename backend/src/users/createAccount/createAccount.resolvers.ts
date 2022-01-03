import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        // 检查 用户名和email是否已经存在DB里
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          new Error("This username/password is already taken");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: uglyPassword,
          },
        });

        return {
          ok: true,
        };
        // password hash 处理
        // 保存并返回用户
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};

export default resolvers;
