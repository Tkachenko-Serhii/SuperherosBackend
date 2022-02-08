const { Superhero, joiSchema } = require('../../models');

const updateById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw res.status(400).json({ message: 'missing fields' });
    }
    const { id } = req.params;

    const updateSuperhero = await Superhero.findByIdAndUpdate(
      id,
      { ...req.body },
      {
        new: true,
      },
    );
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
