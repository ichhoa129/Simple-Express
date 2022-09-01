import bcrypt from 'bcryptjs';

class UserService {
    async handleChangePassword(user, currentPassword, newPassword) {
        const verifyPassword = user.toJSON().hasPassword
            ? user.verifyPassword(currentPassword)
            : 'social';

        if (!verifyPassword) {
            throw new Error('Incorrect Password');
        } else {
            user.password = newPassword;
            return user.save();
        }
    }

    async handleUpdateMe(user, userId, data) {
        data?.password && (data.password = await bcrypt.hash(data.password, 10));
        return User.findByIdAndUpdate(userId, data, { new: true });

    // setTimeout(async () => {
    //   await triggerUpdateCron(user.email);
    // }, 0);
    }

    async handleUpdateMeNonAuth(data) {
        const user = await User.findOne({ email: data.email });
        user.services.twitter = data.services.twitter;
        return user.save();
    }

    async handleGetMe(user) {
        return { ...user.toJSON() };
    }
}

export default new UserService();
