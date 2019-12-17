import express from 'express';
import logger from 'morgan';
import createHttpError from 'http-errors';
import userRouter from './resources/users/routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ ok: true });
});

app.use('/user', userRouter);

app.use((req, res, next) => {
    next(createHttpError(404));
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { message } = err;
    const status = err.status || 500;
    const stack = req.app.get('env') === 'development' && err;

    res.status(err.status || 500);
    res.send({
        status,
        message,
        stack
    });
});


export default app;
