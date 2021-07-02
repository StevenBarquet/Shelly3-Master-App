// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages, validateSchema } from 'Others/joi-stuff';

const messagesTemplates = {
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
  },
  porductID: {
    status: 'success',
    message: invalidMessages.is_id
  }
};

function buildMessageProps(messagesObj) {
  let newProps = { ...messagesObj };
  for (let i = 0; i < 12; i++) {
    newProps = {
      ...newProps,
      [`imgDesk${i}`]: messagesTemplates.imgDesk,
      [`imgMovil${i}`]: messagesTemplates.imgMovil,
      [`text${i}`]: messagesTemplates.text,
      [`textColor${i}`]: messagesTemplates.textColor,
      [`link${i}`]: messagesTemplates.link,
      [`visible${i}`]: messagesTemplates.visible,
      [`porductID${i}`]: messagesTemplates.porductID
    };
  }
  return newProps;
}

// ---schema JS File
const someMessages = {
  paragraph: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 3 caracteres'
  },
  paragraphImg: {
    status: 'success',
    message: invalidMessages.strLengthMin + ' 3 caracteres'
  },
  notice: {
    status: 'success',
    message: invalidMessages.strLengthRange + ' 3 y 100 caracteres'
  }
};

export const messagesSchema = buildMessageProps(someMessages);

function buildExtendedPropertys() {
  let extendedPropertys = {};
  for (let i = 0; i < 9; i++) {
    extendedPropertys = {
      ...extendedPropertys,
      [`imgDesk${i}`]: Joi.string()
        .min(3)
        .allow(''),
      [`imgMovil${i}`]: Joi.string()
        .min(3)
        .allow(''),
      [`text${i}`]: Joi.string().allow(''),
      [`textColor${i}`]: Joi.string().allow(''),
      [`link${i}`]: Joi.string().allow(''),
      [`visible${i}`]: Joi.boolean(),
      [`porductID${i}`]: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .allow('')
    };
  }
  return extendedPropertys;
}

export function joiFormValidate(formData) {
  const schema = Joi.object({
    paragraph: Joi.string()
      .min(3)
      .required(),
    paragraphImg: Joi.string()
      .min(3)
      .required(),
    notice: Joi.string()
      .min(3)
      .max(100)
      .allow('')
  });

  const extendedSchema = schema.append(buildExtendedPropertys());

  return validateSchema(extendedSchema, formData, messagesSchema);
}
