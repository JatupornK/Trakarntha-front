import Joi from "joi";

const addressSchema = Joi.object({
  addressTitle: Joi.string().required().trim().messages({
    "any.required": "Please input the title of the address",
    "string.empty": "Address title is required",
  }),
  firstName: Joi.string().required().trim().messages({
    "any.required": "Please input the first name",
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "any.required": "Please input the last name",
    "string.empty": "Last name is required",
  }), // key of message depend on type of error
  address: Joi.string().required().trim().messages({
    "any.required": "Please input the address",
    "string.empty": "Address is required",
  }),
  postCode: Joi.string()
    .pattern(/^[0-9]{5}$/)
    .required()
    .trim()
    .messages({
      "any.required": "Please input the first name",
      "string.empty": "Postcode is required",
      "string.pattern.base": "The pattern of posstcode is invalid",
    }),
  phoneNumber: Joi.string()
  .required()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "phonenumber is required",
      "string.pattern.base": "The pattern of phonenumber is invalid",
      "any.required": "Please input the phone number",
    }),
});

const validateCreateAddress = (input) => {
  const { error } = addressSchema.validate(input, {
    abortEarly: false, // ทำการ validate ทุกตัว if false
  });
  if (error) {
    const newError = error.details.reduce((acc, el) => {
      acc[el.context.label] = el.message;
      return acc;
    }, {});
    return newError;
  }
};

export { validateCreateAddress };
