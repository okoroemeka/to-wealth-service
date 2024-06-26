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
    totalSaved: Joi.optional(),
    category: Joi.number().required().messages({
      'any.required': 'category is reqiured',
      'string.empty': 'category field cannot be empty',
    }),
    description: Joi.optional(),
  });

const joiUpdatePasswordSchema = () =>
  Joi.object({
    oldPassword: Joi.string().required().messages({
      'any.required': 'old password is reqiured',
      'string.empty': 'old password field cannot be empty',
    }),
    newPassword: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)
      .required()
      .messages({
        'any.required': 'new password is reqiured',
        'string.empty':
          'new password field cannot be empty and must be more than 8 alphanumeric characters eg:Some09@ ',
      }),
    confirmPassword: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/)
      .required()
      .messages({
        'any.required': 'confirm password is reqiured',
        'string.empty':
          'confirm password field cannot be empty and must be more than 8 alphanumeric characters eg:Some09@ ',
      }),
  });

const joiUpdateProfileSchema = () =>
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
    occupation: Joi.string().required().messages({
      'any.required': 'occupation is reqiured',
      'string.empty': 'occupation cannot be empty',
    }),
    birthday: Joi.string().required().messages({
      'any.required': 'birthday is reqiured',
      'string.empty': 'birthday cannot be empty',
    }),
    imageUrl: Joi.string(),
  });

const joiBudgetSchema = () =>
  Joi.object({
    category: Joi.string().required().messages({
      'any.required': 'category is reqiured',
      'string.empty': 'category field cannot be empty',
    }),

    date: Joi.string().required().messages({
      'any.required': 'date is reqiured',
      'string.empty': 'date field cannot be empty',
    }),

    type: Joi.string().required().messages({
      'any.required': 'type is reqiured',
      'string.empty': 'type field cannot be empty',
    }),

    subCategory: Joi.string(),

    budget: Joi.string().required().messages({
      'any.required': 'budget is reqiured',
      'string.empty': 'budget field cannot be empty',
    }),

  });

const joiTransactionSchema = () =>
  Joi.object({
    categoryId: Joi.number().required().messages({
      'any.required': 'category is reqiured',
      'string.empty': 'category field cannot be empty',
    }),

    amount: Joi.number().required().messages({
      'any.required': 'amount is reqiured',
      'string.empty': 'amount field cannot be empty',
    }),

    description: Joi.string().required().messages({
      'any.required': 'description is reqiured',
      'string.empty': 'description field cannot be empty',
    }),

    type: Joi.string().required().messages({
      'any.required': 'type is reqiured',
      'string.empty': 'type field cannot be empty',
    }),

    date: Joi.date().required().messages({
      'any.required': 'date is reqiured',
      'string.empty': 'date field cannot be empty',
    }),
  });

const joiGoalTopUpSchema = () =>
  Joi.object({
    topUpValue: Joi.string().required().messages({
      'any.required': 'top up value is reqiured',
      'string.empty': 'top up value field cannot be empty',
    }),
  });

  const joiGeneralSettingsSchema = () =>
    Joi.object({
      darkMode: Joi.boolean(),
      language: Joi.string(),
      currency: Joi.string(),
      country: Joi.string(),
      countryCode: Joi.string(),
    })

  const joiNetworthSettingsSchema = () =>
    Joi.object({
      interestRate: Joi.number(),
      monthlyIncome: Joi.number(),
      savingType: Joi.string(),
      savingValue: Joi.number()
    })

  const joiNetworthSchema = () =>
    Joi.object({
      name: Joi.string(),
      amount: Joi.number(),
      type: Joi.string()
    })

  const joiNetworthTopupSchema = () =>
    Joi.object({
      amount: Joi.number(),
    })

export {
  joiSignupSchema,
  joiSignInSchema,
  joiGoalSchema,
  joiUpdatePasswordSchema,
  joiUpdateProfileSchema,
  joiBudgetSchema,
  joiGoalTopUpSchema,
  joiGeneralSettingsSchema,
  joiNetworthSettingsSchema,
  joiTransactionSchema,
  joiNetworthSchema,
  joiNetworthTopupSchema,
};
