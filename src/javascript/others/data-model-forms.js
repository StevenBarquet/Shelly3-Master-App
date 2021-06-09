import Joi from '@hapi/joi'; // Joi is a class so uppercase

function createErrorSchema(error, errorSchema) {
  const key = error.details[0].path[0];
  const setErrorObject = { ...errorSchema[key], status: 'error' };
  const newErrorSchema = { ...errorSchema, [key]: setErrorObject };

  return { isValid: false, errorStructure: newErrorSchema };
}

// ----------------------------------------------------ContactForm---------------------------------------------
export const contactFormErrors = {
  nombre: {
    status: 'success',
    message: 'Por favor ingresa un nombre válido'
  },
  apellido: {
    status: 'success',
    message: 'Por favor ingresa un apellido válido'
  },
  correo: {
    status: 'success',
    message: 'Por favor ingresa un correo válido'
  }
};

export function contactFormValidate(form) {
  const schema = Joi.object({
    nombre: Joi.string()
      .min(2)
      .required(),
    apellido: Joi.string()
      .min(2)
      .required(),
    correo: Joi.string()
      .min(3)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'org', 'mx', 'edu'] }
      })
      .required(),
    telefono: Joi.string()
      .min(8)
      .optional()
  });

  const validate = schema.validate(form);

  if (validate.error) {
    return createErrorSchema(validate.error, contactFormErrors);
  }
  return { isValid: true, errorStructure: contactFormErrors };
}

// ----------------------------------------------------ShipmentForm---------------------------------------------

export const shipmentFormErrors = {
  nombre: {
    status: 'success',
    message: 'Por favor ingresa un nombre válido'
  },
  cp: {
    status: 'success',
    message: 'Por favor ingresa un código postal válido'
  },
  estado: {
    status: 'success',
    message: 'Por favor ingresa un estado válido'
  },
  municipio: {
    status: 'success',
    message: 'Por favor ingresa un municipio válido'
  },
  colonia: {
    status: 'success',
    message: 'Por favor ingresa una colonia válido'
  },
  calle: {
    status: 'success',
    message: 'Por favor ingresa una calle válido'
  },
  exterior: {
    status: 'success',
    message: 'Por favor ingresa un número válido'
  },
  entreC1: {
    status: 'success',
    message: 'Por favor ingresa una calle válido'
  },
  entreC2: {
    status: 'success',
    message: 'Por favor ingresa una calle válido'
  },
  referencia: {
    status: 'success',
    message: 'Por favor ingresa una referencia válido'
  },
  domType: {
    status: 'success',
    message: 'Por favor ingresa un tipo de domicilio válido'
  },
  num: {
    status: 'success',
    message: 'Por favor ingresa un numero válido'
  }
};
export function shipmentFormValidate(form) {
  const schema = Joi.object({
    nombre: Joi.string()
      .min(2)
      .required(),
    cp: Joi.string()
      .min(4)
      .max(6)
      .required(),
    estado: Joi.string()
      .min(2)
      .required(),
    municipio: Joi.string()
      .min(2)
      .required(),
    colonia: Joi.string()
      .min(3)
      .required(),
    calle: Joi.string()
      .min(2)
      .required(),
    exterior: Joi.string()
      .min(1)
      .required(),
    interior: Joi.string().optional(),
    entreC1: Joi.string()
      .min(3)
      .required(),
    entreC2: Joi.string()
      .min(3)
      .required(),
    referencia: Joi.string()
      .min(3)
      .required(),
    domType: Joi.string()
      .min(3)
      .required(),
    num: Joi.string()
      .min(8)
      .max(10)
      .required()
  });

  const validate = schema.validate(form);

  if (validate.error) {
    return createErrorSchema(validate.error, shipmentFormErrors);
  }
  return { isValid: true, errorStructure: shipmentFormErrors };
}
