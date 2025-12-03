import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Please enter a valid email address`,
    "string.empty": `"email" address cannot be empty.`,
    "any.required": `"email" is a required`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" address cannot be empty.`,
    "any.required": `"password" is a required`,
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Please enter a valid email address`,
    "string.empty": `"email" address cannot be empty.`,
    "any.required": `"email" is a required`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `"password" should have a minimum length of {#limit}`,
    "string.empty": `"password" address cannot be empty.`,
    "any.required": `"password" is a required`,
  }),
});
