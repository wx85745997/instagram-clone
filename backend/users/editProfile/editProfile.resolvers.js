import client from "../../client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export default {
    Mutation: {
        editProfile: async (
            _,
            { userName, firstName, lastName, email, password: newPassword },
            { loggedInUser ,protecResolver}
        ) => {
            protecResolver(loggedInUser)
            console.log('_+_+_+')
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
        },
    },
};
