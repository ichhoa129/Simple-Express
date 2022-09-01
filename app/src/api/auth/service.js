import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import {
    jwt,
} from '../../services';
import userService from '../users/users.service';

const signup = async data => {
    console.log(data);
    // const user = await User.create(data);
    // const token = jwt.sign({
    //     uid: user._id,
    //     role: user.role,
    // });
    // const refreshToken = jwt.refreshSign(user._id);
    // const result = {
    //     user,
    //     token,
    //     refreshToken,
    // };

    // return result;
};

const login = async user => {
    const userId = user._id;
    const token = jwt.sign({
        uid: userId,
        role: user.role,
    });
    const refreshToken = jwt.refreshSign(userId);
    // save the token
    await userService.update(userId, { refreshToken });

    return { user, token, refreshToken };
};

const logout = async user => {
    user.refreshToken = '';
    await user.save();
};

export default {
    signup,
    login,
    logout,
};
