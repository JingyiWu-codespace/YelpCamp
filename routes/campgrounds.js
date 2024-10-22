const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds.js')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuth, validateCampground } = require('../middleware.js');
const multer = require('multer')
const ExpressError = require('../utils/ExpressError')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const Campground = require('../models/campground');

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.creatCampground))
// .post(upload.single('image'), (req, res) => {
//   res.status(200).send({ body: req.body, file: req.file });

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuth, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuth, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isAuth, catchAsync(campgrounds.renderEditForm))



module.exports = router; 