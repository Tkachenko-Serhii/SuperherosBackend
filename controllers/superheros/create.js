const { Superhero, joiSchema } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const create = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw res.status(400).json(error.message);
    }
    if (req.file) {
      const { path: tempUpload, filename } = req.file;
      const [extention] = filename.split('.').reverse();
      const avatarName = nanoid();
      const newFileName = `${avatarName}.${extention}`;
      const fileUpload = path.join(avatarsDir, newFileName);

      Jimp.read(tempUpload)
        .then(file => {
          fs.unlink(tempUpload);
          return file.resize(500, 500).write(fileUpload);
        })
        .catch(error => {
          console.log(error);
        });
      const avatarURL = path.join('avatars', newFileName);
      const newSuperhero = await Superhero.create({ ...req.body, avatarURL });
      res.status(201).json(newSuperhero);
    }
    const newSuperhero = await Superhero.create(req.body);
    res.status(201).json(newSuperhero);
  } catch (error) {
    if (error.message.includes('Validation failed')) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = create;
