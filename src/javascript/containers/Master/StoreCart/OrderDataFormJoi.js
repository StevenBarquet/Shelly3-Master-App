// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  concepto: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  cantidad: {
    status: 'success',
    message: invalidMessages.isNumber + ' mayor a 0'
  },
  notaVenta: {
    status: 'success',
    message: invalidMessages.optional
  },
  metodoPago: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  montoCliente: {
    status: 'success',
    message: invalidMessages.isNumber
  },
  correo: {
    status: 'success',
    message: invalidMessages.optional
  },
  nombre: {
    status: 'success',
    message: invalidMessages.optional
  },
  apellido: {
    status: 'success',
    message: invalidMessages.optional
  },
  telefono: {
    status: 'success',
    message: invalidMessages.isNumber
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    concepto: Joi.string().when('cantidad', {
      is: Joi.number().required(),
      then: Joi.required(),
      otherwise: Joi.allow('')
    }),
    cantidad: Joi.when(Joi.number().greater(0), {
      // Valida que sea un numero mayor a 0 o una cadena vacia o nula
      otherwise: Joi.valid(null, '')
    }),
    notaVenta: Joi.string().allow(''),
    metodoPago: Joi.string().required(),
    montoCliente: Joi.number().greater(0),
    correo: Joi.string().allow(''),
    nombre: Joi.string().allow(''),
    apellido: Joi.string().allow(''),
    telefono: Joi.number().integer()
  });
  return validateSchema(schema, formData, messagesSchema);
}
