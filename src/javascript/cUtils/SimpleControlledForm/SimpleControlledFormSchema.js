// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  name: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 3'
  },
  gender: {
    status: 'success',
    message: invalidMessages.notEmptySelect
  },
  online: {
    status: 'success',
    message: invalidMessages.isRequired
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    gender: Joi.string().required(),
    online: Joi.boolean().required()
  });
  return validateSchema(schema, formData, messagesSchema);
}
