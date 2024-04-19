import Joi from "joi";

const contactValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^[0-9]{6,}$/)
    .required(),
  address: Joi.string().min(5).max(100).required(),
  photo: Joi.string().uri().required(),
});

export default contactValidation;
