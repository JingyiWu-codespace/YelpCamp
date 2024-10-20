const Campground = require('../models/campground');
const Review = require('../models/review');
const mongoose = require('mongoose');

module.exports.creatReview = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', 'Successfully new review')
  res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).send("Invalid review ID");
  }

  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Successfully delete review')
  res.redirect(`/campgrounds/${id}`);
}