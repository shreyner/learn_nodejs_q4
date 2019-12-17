import Joi from "@hapi/joi";

const paramIdSchema = Joi.object({
    id: Joi.string().guid()
})

export default paramIdSchema;
