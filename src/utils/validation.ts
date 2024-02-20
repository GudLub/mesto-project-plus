import { Joi, celebrate, Segments } from "celebrate";

type ValidatorOptions = {
  // eslint-disable-next-line no-unused-vars
  validator: (arg: string) => boolean;
  message: string;
}

export const urlRegExp = new RegExp(
  "^(http(s)?://)?"
  + "(www\\.)?"
  + "[a-z0-9-._~:/?#[\\]@!$&'()*+,;=]+"
  + "(#[a-z0-9._-]+)?$",
  "i",
);

export const linkValidator: ValidatorOptions = {
  validator: (str: string) => urlRegExp.test(str),
  message: "Аватар должен быть ссылкой",
};

export const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExp).required(),
  }),
});

export const CardValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const getUserByIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const updateUserInfoValidator = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),

  }),
});

export const updateUserAvatarValidator = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().required().pattern(urlRegExp),
  }),
});

export const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExp),
  }),
});

export const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});