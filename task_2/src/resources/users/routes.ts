import express from 'express';
import createHttpError from 'http-errors';
import { createValidator } from 'express-joi-validation';
import userSchema from './validation/userSchema';
import paramIdSchema from './validation/params';
import queryGetUsers from './validation/queryGetUsers';
import userModel from './model';
import { User } from './types';

const router = express.Router();
const validator = createValidator();

const createUser: express.RequestHandler = (req, res, next) => {
    res.json(userModel.create(req.body as Omit<User, 'id' | 'idDeleted'>));
};

const getListUsers: express.RequestHandler = (req, res) => {
    const { limit, loginSubstring } = req.query;

    return !!loginSubstring
        ? res.json(userModel.getAutoSuggestUsers(loginSubstring, limit))
        : res.json(userModel.getActiveUsers());
};

const getUser: express.RequestHandler<{id: string}> = (req, res, next) => {
    const { id } = req.params;

    const user = userModel.findById(id);

    if (!user) {
        next(createHttpError(404));
        return;
    }

    res.json(user);
};

const updateUser: express.RequestHandler<{id: string}> = (req, res, next) => {
    const { id } = req.params;
    const user = req.body as Omit<User, 'id' | 'idDeleted'>;

    if (!userModel.findById(id)) {
        next(createHttpError(404));
        return;
    }

    res.json(userModel.update({ id, ...user }));
};

const deleteUser: express.RequestHandler<{id: string}> = (req, res, next) => {
    const { id } = req.params;

    if (!userModel.findById(id)) {
        next(createHttpError(404));
        return;
    }

    return userModel.deleteUser(id) ? res.status(204).send() : next(createHttpError(400));
};

// Routers
router.get('/', getListUsers);
router.post('/', validator.body(userSchema), createUser);
router.get('/:id', validator.params(paramIdSchema), validator.query(queryGetUsers), getUser);
router.patch('/:id', validator.params(paramIdSchema), validator.body(userSchema), updateUser);
router.delete('/:id', validator.params(paramIdSchema), deleteUser);

export default router;

