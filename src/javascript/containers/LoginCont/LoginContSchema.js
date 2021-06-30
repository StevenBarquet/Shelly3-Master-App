// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  mail: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 5'
  },
  pass: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 6'
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    mail: Joi.string()
      .min(5)
      .required(),
    pass: Joi.string()
      .min(6)
      .required()
  });
  return validateSchema(schema, formData, messagesSchema);
}
