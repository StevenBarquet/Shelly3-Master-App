// ---Dependencys
import Joi from 'joi';
// ---Other
import { appData } from 'Others/store-data.json';
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

const { menuRoutes } = appData;

// ---schema JS File
// ------------------------------Error Messages------------------------
const someMessages = {
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
  },
  docsUrl: {
    status: 'success',
    message: invalidMessages.optional
  }
  // Routes input
};

// to Build dinamyc error messages
function buildMessagePropertys(messages) {
  let newMessages = messages;
  menuRoutes.forEach(roteData => {
    const { routeName } = roteData;
    newMessages = {
      ...newMessages,
      [routeName]: {
        status: 'success',
        message: invalidMessages.isRequired
      }
    };
  });
  return newMessages;
}

export const messagesSchema = buildMessagePropertys(someMessages);

// ------------------------------JOI VALIDATION------------------------
// to Build dinamyc joi validation rules
function buildExtendedPropertys() {
  let extendedPropertys = {};
  menuRoutes.forEach(roteData => {
    const { routeName } = roteData;
    extendedPropertys = {
      ...extendedPropertys,
      [routeName]: Joi.boolean().required()
    };
  });
  return extendedPropertys;
}
export function joiFormValidate(formData) {
  const schema = Joi.object({
    // Basic inputs
    mail: Joi.string()
      .min(3)
      .email({ tlds: { allow: false } })
      .required(),
    pass: Joi.string()
      .min(6)
      .required(),
    confirmPass: Joi.string()
      .required()
      .valid(Joi.ref('pass')),
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
    adress: Joi.string().allow(''),
    docsUrl: Joi.string().allow('')
    // Routes input
  });

  const extendedSchema = schema.append(buildExtendedPropertys());

  return validateSchema(extendedSchema, formData, messagesSchema);
}
