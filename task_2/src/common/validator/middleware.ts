import { ErrorRequestHandler } from 'express';

const middleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        const statusCode = 400;

        return res.status(statusCode).json({
            status: statusCode,
            fields: (err.error.details as Array<{path: string[], message: string}>).map(({ path, message }) => ({
                field: path.join('.'),
                message
            }))
        });
    }

    // pass on to another error handler
    return next(err);
};

export default middleware;
