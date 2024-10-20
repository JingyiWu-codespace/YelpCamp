const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js')
const catchAsync = require('../utils/catchAsync');

const { isLoggedIn, isAuth, validateCampground } = require('../middleware.js');

const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.creatCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuth, validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuth, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isAuth, catchAsync(campgrounds.renderEditForm))



module.exports = router; 