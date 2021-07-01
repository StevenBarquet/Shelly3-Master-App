// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
// ------------------------------Error Messages------------------------
export const messagesSchema = {
  // Basic inputs
  mail: {
    status: 'success',
    message: invalidMessages.isMail
  },
  pass: {
    status: 'success',
    message: 'La logitud de la contraseña debe ser minimo de 6 caracteres'
  },
  confirmPass: {
    status: 'success',
    message: 'La contraseña no coincide'
  },
  fullName: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 3 caracteres'
  },
  // Profile inputs
  rfc: {
    status: 'success',
    message: invalidMessages.strLengthRange + ' 12 y 13 caracteres'
  },
  phone: {
    status: 'success',
    message: invalidMessages.isPhone
  },
  otherPhone: {
    status: 'success',
    message: invalidMessages.isPhone
  },
  adress: {
    status: 'success',
    message: invalidMessages.optional
  }
  // Routes input
};

// ------------------------------JOI VALIDATION------------------------
export function joiFormValidate(formData) {
  const schema = Joi.object({
    // Basic inputs
    mail: Joi.string()
      .min(3)
      .email({ tlds: { allow: false } })
      .required(),
    pass: Joi.string()
      .min(6)
      .allow(''),
    confirmPass: Joi.string().when('pass', {
      is: Joi.string().required(),
      then: Joi.valid(Joi.ref('pass')).required(),
      otherwise: Joi.allow('')
    }),
    fullName: Joi.string()
      .min(5)
      .required(),
    // Profile inputs
    rfc: Joi.string()
      .min(12)
      .max(13)
      .allow(''),
    phone: Joi.number()
      .integer()
      .greater(99999999)
      .less(10000000000),
    otherPhone: Joi.number()
      .integer()
      .greater(99999999)
      .less(10000000000),
    adress: Joi.string().allow('')
  });

  return validateSchema(schema, formData, messagesSchema);
}
