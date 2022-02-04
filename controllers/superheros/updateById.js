const { Superhero, joiSchema } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw res.status(400).json({ message: 'missing fields' });
    }
    const { id } = req.params;
    if (req.file) {
      const { path: tempUpload, filename } = req.file;
      const [extention] = filename.split('.').reverse();
      const avatarName = nanoid();
      const newFileName = `${avatarName}.${extention}`;
      const fileUpload = path.join(avatarsDir, newFileName);

      Jimp.read(tempUpload)
        .then(file => {
          fs.unlink(tempUpload);
          return file.resize(250, 250).write(fileUpload);
        })
        .catch(error => {
          console.log(error);
        });
      const avatarURL = path.join('avatars', newFileName);
      const updateSuperhero = await Superhero.findByIdAndUpdate(
        id,
        { ...req.body, avatarURL },
        {
          new: true,
        },
      );
      res.json(updateSuperhero);
    }
    const updateSuperhero = await Superhero.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateSuperhero);
    if (!updateSuperhero) {
      throw new NotFound();
    }
    res.json(updateSuperhero);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
