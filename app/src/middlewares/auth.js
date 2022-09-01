import Response from '../helpers/response';

export default class AuthService {
    static getTokenFromHeaders(req) {
        if (req.headers.authorization) {
            const re = /(\S+)\s+(\S+)/;
            const matches = req.headers.authorization.match(re);
            return matches && { scheme: matches[1], value: matches[2] };
        }
        return null;
    }

    static required(req, res, next) {
        return passport.authenticate(
            'jwt',
            { session: false },
            (err, user, info) => {
                if (!user && info?.name === 'TokenExpiredError') {
                    return Response.error(
                        res,
                        {
                            code: 'Unauthorized',
                            message: 'TokenExpiredError',
                        },
                        401
                    );
                }
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return Response.error(
                        res,
                        {
                            code: 'Unauthorized',
                            message: 'Invalid Token',
                        },
                        401
                    );
                }
                req.logIn(user, err => {
                    if (err) {
                        return next(err);
                    }
                    return next();
                });
            }
        )(req, res, next);
    }

    static retrieveToken(req, res, next) {
        const token = AuthService.getTokenFromHeaders(req);
        if (token) {
            req.token = token;
        }
        next();
    }

    static roles(roles = []) {
        return (req, res, next) => {
            if (typeof roles === 'string') {
                roles = [roles];
            }
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return Response.error(
                    res,
                    {
                        message: 'You are not authorized to access this page!',
                        code: 'Unauthorized',
                    },
                    401
                );
            }

            // authentication and authorization successful
            next();
        };
    }

    static optional(req, res, next) {
        const token = AuthService.getTokenFromHeaders(req);
        if (token) {
            return AuthService.required(req, res, next);
        }
        next();
    }

    static isAdmin() {
        return AuthService.roles('admin');
    }

    static isActive(req, res, next) {
        if (req.user.status === 'ACTIVE') {
            return next();
        }
        return Response.error(
            res,
            {
                message: 'User is banned!',
                code: 'Unauthorized',
            },
            401
        );
    }
}

// // export const authLocal = passport.authenticate('local', { session: false });
// export const authLocal = (req, res, next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             return Response.error(
//                 res,
//                 {
//                     code: 'Unauthorized',
//                     message: 'Your email or password is incorrect',
//                 },
//                 401
//             );
//         }
//         req.logIn(user, err => {
//             if (err) {
//                 return next(err);
//             }
//             return next();
//         });
//     })(req, res, next);
// };
// export const authJwt = passport.authenticate('jwt', { session: false });
