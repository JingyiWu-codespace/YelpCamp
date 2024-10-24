const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/review')


const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});


const CampgroundSchma = new Schema({
  title: String,
  images: [ImageSchema],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

CampgroundSchma.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchma);