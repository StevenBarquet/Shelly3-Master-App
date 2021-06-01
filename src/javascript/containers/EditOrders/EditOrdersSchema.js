// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

// ---schema JS File
export const messagesSchema = {
  estatus: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  responsableVenta: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  metodoPago: {
    status: 'success',
    message: invalidMessages.isString
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
  },
  notaVenta: {
    status: 'success',
    message: invalidMessages.optional
  },
  concepto: {
    status: 'success',
    message: invalidMessages.isRequired
  },
  cantidad: {
    status: 'success',
    message: invalidMessages.isNumber + ' diferente a 0'
  }
};

export function joiFormValidate(formData) {
  const schema = Joi.object({
    concepto: Joi.string().when('cantidad', {
      is: Joi.number().required(),
      then: Joi.required(),
      otherwise: Joi.allow('')
    }),
    cantidad: Joi.when(Joi.number().invalid(0), {
      // Valida que sea un numero mayor a 0 o una cadena vacia o nula
      otherwise: Joi.valid(null, '')
    }),
    estatus: Joi.string().allow(''),
    responsableVenta: Joi.string().allow(''),
    notaVenta: Joi.string().allow(''),
    metodoPago: Joi.string().required(),
    correo: Joi.string().allow(''),
    nombre: Joi.string().allow(''),
    apellido: Joi.string().allow(''),
    telefono: Joi.number().integer()
  });
  return validateSchema(schema, formData, messagesSchema);
}
