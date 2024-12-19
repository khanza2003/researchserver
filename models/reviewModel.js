const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    //researchId: {
    //  type: String,  // Changed from ObjectId to String
    //  required: true,
   // },
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

