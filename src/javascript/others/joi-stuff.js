export const invalidMessages = {
  optional: 'Este campo es opcional',
  isString: `El campo debe ser de tipo texto`,
  isNumber: `El campo debe ser de tipo numérico`,
  isRequired: `Campo requerido`,
  notEmpty: `El campo no puede estar vacío`,
  strLengthRange: `La logitud del texto debe ser entre`,
  strLengthMin: `La logitud del texto debe ser minimo de`,
  invalidMail: 'El formato del correo es inválido, debe contener "@" & ".com',
  samePassword: 'El campo debe ser igual al password',
  notEmptySelect: 'Seleccione una opción',
  multiSelect: 'Debe seleccionar al menos una opción'
};

export function createErrorSchema(error, messagesSchema) {
  // Build an error msg schema with status error in the error fields
  let newErrorMessagesSchema = { ...messagesSchema };

  error.details.forEach(element => {
    const { key } = element.context;
    const setErrorObject = { ...newErrorMessagesSchema[key], status: 'error' };
    newErrorMessagesSchema = {
      ...newErrorMessagesSchema,
      [key]: setErrorObject
    };
  });

  return { isValid: false, messagesSchema: newErrorMessagesSchema };
}

export function validateSchema(schema, formData, messagesSchema) {
  const { error } = schema.validate(formData, { abortEarly: false });
  if (error) {
    console.log('Joi Error: ', error.details);
    return createErrorSchema(error, messagesSchema);
  }
  return { isValid: true, messagesSchema };
}

export default null;
