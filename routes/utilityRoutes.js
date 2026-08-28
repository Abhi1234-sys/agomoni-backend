const express = require('express');
const router = express.Router();

const {
  getAllRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllParkings,
  createParking,
  updateParking,
  deleteParking,
  getAllToilets,
  createToilet,
  updateToilet,
  deleteToilet
} = require('../controllers/utilityController');


router.route('/restaurants')
  .get(getAllRestaurants)
  .post(createRestaurant);

router.route('/restaurants/:id')
  .put(updateRestaurant)
  .delete(deleteRestaurant);

router.route('/parkings')
  .get(getAllParkings)
  .post(createParking);

router.route('/parkings/:id')
  .put(updateParking)
  .delete(deleteParking);


router.route('/toilets')
  .get(getAllToilets)
  .post(createToilet);

router.route('/toilets/:id')
  .put(updateToilet)
  .delete(deleteToilet);

module.exports = router;