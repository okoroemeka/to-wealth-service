/* eslint-disable implicit-arrow-linebreak */
import Joi from '@hapi/joi';

/**
 * Validates SignUp inputs
 *@returns {function} joiSignupSchema
 */
const joiSignupSchema = () =>
  Joi.object({
    fullname: Joi.string().required().messages({
      'any.required': 'fullname is reqiured',
      'string.empty': 'fullname cannot be empty',
    }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required()
      .messages({
        'any.required': 'email is reqiured',
        'string.empty': 'email field cannot be empty',
      }),
    password: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)
      .required()
      .messages({
        'any.required': 'password is reqiured',
        'string.empty':
          'password field cannot be empty and must be more than 8 alphanumeric characters eg:Some09@ ',
      }),
  });
const joiSignInSchema = () =>
  Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
      })
      .required()
      .messages({
        'any.required': 'email is reqiured',
        'string.empty': 'email field cannot be empty',
      }),
    password: Joi.string().required().messages({
      'any.required': 'password is reqiured',
      'string.empty': 'password field cannot be empty',
    }),
  });
const joiGoalSchema = () =>
  Joi.object({
    goalName: Joi.string().required().messages({
      'any.required': 'goal name is reqiured',
      'string.empty': 'goal name cannot be empty',
    }),
    goalValue: Joi.string().required().messages({
      'any.required': 'goal value is reqiured',
      'string.empty': 'goal value cannot be empty',
    }),
    timeline: Joi.string().required().messages({
      'any.required': 'timeline is reqiured',
      'string.empty': 'timeline cannot be empty',
    }),
  });
export { joiSignupSchema, joiSignInSchema, joiGoalSchema };
