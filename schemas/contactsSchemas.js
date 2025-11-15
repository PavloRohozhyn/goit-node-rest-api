import Joi from "joi";

/**
 *
 */
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    "string.empty": `"name" cannot be an empty`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "string.max": `"name" should have a minimum length of {#limit}`,
    "any.required": `"name" is a required`,
  }),

  email: Joi.string().email().required().messages({
    "string.email": `Please enter a valid email address`,
    "string.empty": `"email" address cannot be empty.`,
    "any.required": `"email" is a required`,
  }),

  phone: Joi.string().required().messages({
    "string.empty": `"phone" address cannot be empty.`,
    "any.required": `"phone" is a required`,
  }),
});

/**
 *
 */
export const updateContactSchema = Joi.object({});
