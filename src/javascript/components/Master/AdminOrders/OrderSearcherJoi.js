// ---Dependencys
import Joi from 'joi';
// ---Other
import { invalidMessages } from 'Others/joi-stuff';

const searchedValue = (rule, value) => {
  const schema = Joi.string()
    .min(3)
    .optional()
    .allow('');
  const message = `${invalidMessages.strLengthMin} 3 caracteres`;
  const validation = schema.validate(value);

  if (!validation.error) {
    return Promise.resolve();
  }
  console.log('Joi error: ', validation.error.details);
  return Promise.reject(message);
};

export const validate = {
  searchedValue
};

export default null;
