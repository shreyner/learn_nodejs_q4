import Joi from '@hapi/joi';
import { User } from '../types';

const userSchema = Joi.object<Omit<User, 'id' | 'isDeleted'>>({
    login: Joi.string().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/),
    age: Joi.number().required().min(3).max(130)
});

export default userSchema;
