import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  name: Joi.string().required().min(3),
  amount: Joi.string().required().min(3),
});

const userSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(8),
  level: Joi.number().required().min(1),
  classe: Joi.string().required().min(3),
});

export {
  loginSchema,
  productSchema,
  userSchema,
};
