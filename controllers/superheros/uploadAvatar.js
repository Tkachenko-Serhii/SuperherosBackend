const { Superhero, joiSchema } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const uploadAvatar = async (req, res, next) => {
  try {
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
          return file.resize(500, 500).write(fileUpload);
        })
        .catch(error => {
          console.log(error);
        });
      const avatarURL = path.join('avatars', newFileName);

      const uploadAvatar = await Superhero.findByIdAndUpdate(
        id,
        { avatarURL },
        {
          new: true,
        },
      );
      res.json(uploadAvatar);

      if (!updateSuperhero) {
        throw new NotFound();
      }
      res.json(uploadAvatar);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
