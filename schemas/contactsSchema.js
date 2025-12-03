import Joi from "joi";
import { PHONE_PATTERN } from "./../consts/constans.js";

/**
 * Create validation
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
  phone: Joi.string().pattern(PHONE_PATTERN).required().messages({
    "string.empty": `"phone" address cannot be empty.`,
    "string.pattern.base": `"phone" should have a next format (000) 000-0000`,
    "any.required": `"phone" is a required`,
  }),
});

/**
 * Update validation
 */
export const updateContactSchema = Joi.object({
  name: Joi.string().optional().min(3).max(255).messages({
    "string.min": `"name" should have a minimum length of {#limit}`,
    "string.max": `"name" should have a minimum length of {#limit}`,
  }),
  email: Joi.string().optional().email().messages({
    "string.email": `Please enter a valid email address`,
  }),
  phone: Joi.string().optional().pattern(PHONE_PATTERN).messages({
    "string.pattern.base": `"phone" should have a next format (000) 000-0000`,
  }),
});

/**
 * Update contact favorites
 */
export const updateContactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().messages({
    "string.base": `"favorite" should have a boolean value`,
  }),
});
