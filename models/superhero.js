const { Schema, model } = require('mongoose');
const Joi = require('joi');

const superheroSchema = Schema(
  {
    nickname: {
      type: String,
      required: [true, 'Set nickname for superhero'],
    },
    real_name: {
      type: String,
      required: [true, 'Set real name for superhero'],
    },
    origin_description: {
      type: String,
    },
    superpowers: {
      type: String,
      required: [true, 'Set superpowers for superhero'],
    },
    catch_phrase: {
      type: String,
    },
    avatarURL: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true },
);

const joiSchema = Joi.object({
  nickname: Joi.string().min(3).max(10).required(),
  real_name: Joi.string().min(3).max(15).required(),
  superpowers: Joi.string().min(3).required(),
  origin_description: Joi.string(),
  catch_phrase: Joi.string(),
  avatarURL: Joi.string(),
});

const Superhero = model('superhero', superheroSchema);

module.exports = { Superhero, joiSchema };
