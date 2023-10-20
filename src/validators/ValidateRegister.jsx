import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": "firstname is required" }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({ "string.empty": "lastname is required" }), // key of message depend on type of error
  mobile: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "mobile is required",
      "string.pattern.base": "The pattern of mobile number is invalid",
    }),
  email: Joi.string()
    .trim()
    .required()
    .email({ tlds: false })
    .messages({
      "string.email": "email should be like this pattern ex:a@gmail.com",
      "string.empty": "email is required",
    }),
  password: Joi.string().required().alphanum().min(6).trim().messages({
    "string.empty": "password is required",
    "string.min": "password length must have at least 6 characters",
    "string.alphanum": "password must contain number or alphabet",
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, {
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

export default validateRegister;
