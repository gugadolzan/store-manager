const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.remove);

module.exports = router;
