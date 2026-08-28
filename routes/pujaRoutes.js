const express = require('express');
const router = express.Router();
const {
  getAllPujas,
  createPuja,
  updatePuja,
  deletePuja
} = require('../controllers/pujaController');

router.route('/')
  .get(getAllPujas)
  .post(createPuja);

router.route('/:id')
  .put(updatePuja)
  .delete(deletePuja);

module.exports = router;