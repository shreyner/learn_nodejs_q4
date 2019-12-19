import Joi from '@hapi/joi';

const queryGetUsers = Joi.object({
    limit: Joi.number().min(1).max(40),
    loginSubstring: Joi.string()
});

export default queryGetUsers;
