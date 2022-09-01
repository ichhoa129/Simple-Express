import httpStatus from 'http-status';
import Response from '../../helpers/response';
import authService from './service';

export const signup = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await authService.signup(data);
        return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
        next(exception);
    }
};

export const login = async (req, res) => {
    const { user } = req;
    if (user.status === 'BANNED') {
        return Response.error(
            res,
            {
                message: 'User is banned!',
                code: 'Unauthorized',
            },
            401
        );
    }
    const result = await authService.login(user);
    // return the information including token as JSON
    return Response.success(res, result, httpStatus.OK);
};

export const logout = async (req, res, next) => {
    try {
        await authService.logout(req.user);
        return Response.success(res, null, httpStatus.OK);
    } catch (exception) {
        next(exception);
    }
};

export const checkEmail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await authService.checkEmailIsValid(email);
        return Response.success(res, result, httpStatus.OK);
    } catch (exception) {
        next(exception);
    }
};

export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        await authService.forgotPassword(email);
        return Response.success(res);
    } catch (exception) {
        next(exception);
    }
};

export const resendVerifyEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        await authService.resendVerifyEmail(email);
        return Response.success(res);
    } catch (exception) {
        next(exception);
    }
};

export const verifyCode = async (req, res, next) => {
    const data = req.body;
    try {
        const result = await authService.verifyCode(data);
        return Response.success(res, result);
    } catch (exception) {
        next(exception);
    }
};

export const verifyEmailToken = async (req, res, next) => {
    const data = req.body;
    try {
        await authService.verifyEmailToken(data);
        return Response.success(res);
    } catch (exception) {
        next(exception);
    }
};

export const resetPassword = async (req, res, next) => {
    const { newPassword } = req.body;
    const { user } = req;
    try {
        const result = await authService.resetPassword(user, newPassword);
        return Response.success(res, result);
    } catch (exception) {
        next(exception);
    }
};

export const loginWithApple = async (req, res, next) => {
    try {
        const { access_token } = req.body;

        const result = await authService.loginWithApple(access_token);

        return Response.success(res, result);
    } catch (e) {
        next(e);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        const result = await authService.refreshToken(token);
        return Response.success(res, result);
    } catch (exception) {
        next(exception);
    }
};

// Twitter
export const requestToken = async (req, res, next) => {
    try {
        const { callbackUrl } = req.body;
        const result = await authService.requestToken(callbackUrl);
        return Response.success(res, result);
    } catch (exception) {
        console.log('exception', exception.response.data);
        next(exception);
    }
};

export const verifyToken = async (req, res, next) => {
    try {
        const { oauth_token, oauth_verifier } = req.body;
        const result = await authService.verifyToken(oauth_token, oauth_verifier);

        const bodyString = `{ "${result.replace(/&/g, '", "').replace(/=/g, '": "')}"}`;
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        next();
    } catch (exception) {
        console.log('exception', exception.response.data);
        next(exception);
    }
};
