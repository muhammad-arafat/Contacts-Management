import slugify from "slugify";
import ContactInfo from "../models/contact.model.js";
import contactValidation from "../joiSchema/contact.validation.js";

export const create = async (req, res) => {
  try {
    console.log("inside create", req.body);
    const { error } = contactValidation.validate(req.body);
    if (error) {
      const joiError = error.message;
      console.log("joi error", joiError);
      return res.status(400).json(joiError);
    }
    req.body.slug = slugify(req.body.name);
    const contact = await new ContactInfo(req.body).save();
    res.json(contact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const allList = async (req, res) => {
  const contacts = await ContactInfo.find({});
  res.json(contacts);
};

export const remove = async (req, res) => {
  try {
    const removed = await ContactInfo.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(removed);
  } catch (error) {
    return res.status(400).send("400 Bad Request!");
  }
};

export const read = async (req, res) => {
  const contact = await ContactInfo.findOne({ slug: req.params.slug }).exec();
  res.json(contact);
};

export const update = async (req, res) => {
  try {
    const { error } = contactValidation.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const existingContact = await ContactInfo.findOne({
      slug: req.params.slug,
    });

    if (!existingContact) {
      return res.status(404).json({ error: "Contact not found!" });
    }
    Object.assign(existingContact, req.body);
    const updatedContact = await existingContact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
