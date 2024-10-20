const { campgroundSchema, reviewSchema } = require('./schemas.js');

const ExpressError = require('./utils/ExpressError.js');
const Campground = require('./models/campground.js');
const Review = require('./models/review.js')

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo
  }
  next();
}

module.exports.isLoggedIn = (req, res, next) => {
  // store the url they are requesting
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash('error', 'you must be sign in first');
    return res.redirect('/login');
  }
  next();
}
module.exports.validateCampground = (req, res, next) => {
  console.log('Request body:', req.body);
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map(el => el.message).join(',')
    console.log('Validation error message:', message);
    throw new ExpressError(message, 400)
  }
  next();
}

module.exports.isAuth = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
}

module.exports.isReviewAuth = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
}

module.exports.validateReview = (req, res, next) => {
  const { err } = reviewSchema.validate(req.body);
  if (err) {
    const message = err.details.map(el => el.message).join(',')
    throw new ExpressError(message, 400)
  }
  next();
}