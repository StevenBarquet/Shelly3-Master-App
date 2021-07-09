// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  imgDesk: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  imgMovil: {
    status: 'success',
    message: invalidMessages.optional
  },
  text: {
    status: 'success',
    message: invalidMessages.optional
  },
  textColor: {
    status: 'success',
    message: invalidMessages.optional
  },
  link: {
    status: 'success',
    message: invalidMessages.optional
  },
  visible: {
    status: 'success',
    message: invalidMessages.isRequired
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    imgDesk: Joi.string()
      .min(3)
      .required(),
    imgMovil: Joi.string()
      .min(3)
      .required(),
    text: Joi.string().allow(''),
    textColor: Joi.string().allow(''),
    link: Joi.string().allow(''),
    visible: Joi.boolean()
  });
  return validateSchema(schema, formData, messagesSchema);
}
