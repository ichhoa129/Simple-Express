/* eslint-disable no-unused-vars */
import { isCelebrateError } from 'celebrate';
import httpStatus from 'http-status';
import { logger } from '../services';
import Response from './response';

export const errorHandle = (error, req, res, next) => {
    if (typeof error === 'string') {
    // custom application error
        return Response.error(res, { message: error });
    } if (isCelebrateError(error)) {
        const errors = [];
        error.details.forEach(err => {
            errors.push({
                message: err.message,
                type: err.name
            });
        });
        return Response.error(res, {
            message: 'Invalid request data. Please review request and try again.',
            code: error.name,
            errors
        });
    } if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return Response.error(res, {
            // code: error.name,
            message: 'malformatted id',
        });
    } if (error.name === 'ValidationError') {
        return Response.error(res, {
            message: error.message,
        });
    } if (error.name === 'Error') {
        return Response.error(res, {
            message: error.message,
        });
    } if (error.name === 'CustomError') {
        return Response.error(res, error);
    }
    // default to 500 server error
    logger.debug('%o', error);
    return Response.error(
        res,
        {
            message: error.message,
        },
        httpStatus.INTERNAL_SERVER_ERROR
    );
};

export const logErrors = (err, req, res, next) => {
    next(err);
};

export const notFoundHandle = (req, res, next) => Response.error(
    res,
    {
        code: 'NotFound',
        message: 'Page Not Found',
    },
    404
);
