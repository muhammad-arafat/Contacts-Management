import Joi from "joi";

const contactValidation = Joi.object({
  name: Joi.string().min(2).max(30).required(),

  email: Joi.string().email(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  address: Joi.string().min(5).max(100).required(),
  profilePicture: Joi.string().uri().required(),
});

export default contactValidation;
