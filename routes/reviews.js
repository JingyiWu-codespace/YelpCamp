const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const { validateReview, isLoggedIn, isReviewAuth } = require('../middleware')
const Review = require('../models/review')
const reviews = require('../controllers/reviews.js');
const mongoose = require('mongoose');


const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.creatReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuth, catchAsync(reviews.deleteReview))

module.exports = router;
