const Joi = require('joi'); // Joi is a class so uppercase

export function validateML(input) {
  const schema = Joi.string()
    .min(10)
    .pattern(/^\S*$/); // string with no whitespace

  return schema.validate(input);
}

export default null;
