const { Superhero } = require('../../models');
const { NotFound } = require('http-errors');

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const superheros = await Superhero.findById(id);
    if (!superheros) {
      throw new NotFound();
    }
    res.json(superheros);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
};

module.exports = getById;
