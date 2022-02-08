const express = require('express');

const router = express.Router();

const { upload } = require('../../middlewares');

const ctrl = require('../../controllers/superheros');

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getById);

router.post('/create', upload.single('avatar'), ctrl.create);

router.delete('/:id', ctrl.deleteById);

router.put('/:id/update', ctrl.updateById);

router.post('/:id/upload', upload.single('avatar'), ctrl.uploadAvatar);

module.exports = router;
