const { Superhero } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const superheros = await Superhero.find({}, '', {
      skip,
      limit: +limit,
    });
    res.json(superheros);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
