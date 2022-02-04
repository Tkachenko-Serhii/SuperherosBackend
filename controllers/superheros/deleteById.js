const { Superhero } = require('../../models');
const { NotFound } = require('http-errors');

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteSuperhero = await Superhero.findByIdAndRemove(id);
    if (!deleteSuperhero) {
      throw new NotFound();
    }
    res.json({ message: 'Superhero deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
