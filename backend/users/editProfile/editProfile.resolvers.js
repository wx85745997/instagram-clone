import client from "../../client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { protectedResolver } from '../users.utils'
export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                { userName, firstName, lastName, email, password: newPassword,bio,avatar},
                { loggedInUser }
            ) => {
                console.log('avatar',avatar)
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        userName,
                        firstName,
                        lastName,
                        email,
                        bio,
                        ...(uglyPassword && { password: uglyPassword }),
                    },
                });
                if (updatedUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        error: "could not update profile",
                    };
                }
            }
        )
    },
};
