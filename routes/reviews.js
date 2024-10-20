const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review.js')
const mongoose = require('mongoose');
const { reviewSchema } = require('../schemas.js');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')


const validateReview = (req, res, next) => {
  const { err } = reviewSchema.validate(req.body);
  if (err) {
    const message = err.details.map(el => el.message).join(',')
    throw new ExpressError(message, 400)
  }
  next();
}


router.post('/', validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Successfully new review')
  res.redirect(`/campgrounds/${campground._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).send("Invalid review ID");
  }

  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully delete review')
  res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;
