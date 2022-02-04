const express = require('express');

const router = express.Router();

const { upload } = require('../../middlewares');

const ctrl = require('../../controllers/superheros');

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/', upload.single('avatar'), ctrl.create);

router.delete('/:id', ctrl.deleteById);

router.put('/:id', upload.single('avatar'), ctrl.updateById);

module.exports = router;
