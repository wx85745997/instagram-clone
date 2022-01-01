import client from "../../client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { protectedResolver } from '../users.utils'
import { createWriteStream } from "fs"
export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                { userName, firstName, lastName, email, password: newPassword, bio, avatar },
                { loggedInUser }
            ) => {
                let  avatarUrl = null
                if (avatar) {
                    console.log('avatar', avatar)
                    const { filename, createReadStream } = await avatar
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
                    const readStream = createReadStream()
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename)
                    readStream.pipe(writeStream)
                    avatarUrl = `http://localhost:4000/static/${newFilename}`
                }
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
                        ...(avatar && { avatar: avatarUrl })
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
