// // controllers/reviewController.js
// const Review = require('../models/reviewModel');

// // Add a new review
// const addReview = async (req, res) => {
//     try {
//       const { firstName, review, rating, researchId } = req.body;
  
//       if (!firstName || !review || !rating || !researchId) {
//         return res.status(400).json({ message: 'All fields are required.' });
//       }
  
//       const newReview = new Review({ firstName, review, rating, researchId });
//       await newReview.save();
  
//       // Make sure you're returning the review in the response
//       res.status(201).json({ message: 'Review added successfully!', review: newReview });
//     } catch (error) {
//       console.error('Error saving review:', error);
//       res.status(500).json({ message: 'Server error.', error: error.message });
//     }
//   };
  

// // Update a review
// const updateReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { review, rating } = req.body;

//     const updatedReview = await Review.findByIdAndUpdate(
//       id,
//       { review, rating },
//       { new: true, runValidators: true }
//     );

//     if (!updatedReview) {
//       return res.status(404).json({ message: 'Review not found.' });
//     }

//     res.status(200).json({ message: 'Review updated successfully!', review: updatedReview });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Delete a review
// const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedReview = await Review.findByIdAndDelete(id);

//     if (!deletedReview) {
//       return res.status(404).json({ message: 'Review not found.' });
//     }

//     res.status(200).json({ message: 'Review deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Fetch reviews by research ID
// const getReviewsByResearchId = async (req, res) => {
//   try {
//     const { researchId } = req.params;

//     const reviews = await Review.find({ researchId });

//     if (!reviews.length) {
//       return res.status(404).json({ message: 'No reviews found for this research.' });
//     }

//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// module.exports = {
//   addReview,
//   updateReview,
//   deleteReview,
//   getReviewsByResearchId,
// };
// const Review = require('../models/reviewModel');

// // Add a new review
// const addReview = async (req, res) => {
//   try {
//     const { firstName, review, rating } = req.body;

//     // Ensure that all necessary fields are provided
//     if (!firstName || !review || !rating) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     const newReview = new Review({ firstName, review, rating });
//     await newReview.save();

//     // Return the added review in the response
//     res.status(201).json({ message: 'Review added successfully!', review: newReview });
//   } catch (error) {
//     console.error('Error saving review:', error);
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Update a review
// const updateReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { review, rating } = req.body;

//     const updatedReview = await Review.findByIdAndUpdate(
//       id,
//       { review, rating },
//       { new: true, runValidators: true }
//     );

//     if (!updatedReview) {
//       return res.status(404).json({ message: 'Review not found.' });
//     }

//     res.status(200).json({ message: 'Review updated successfully!', review: updatedReview });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Delete a review
// const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedReview = await Review.findByIdAndDelete(id);

//     if (!deletedReview) {
//       return res.status(404).json({ message: 'Review not found.' });
//     }

//     res.status(200).json({ message: 'Review deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error.', error: error.message });
//   }
// };

// // Remove the `getReviewsByResearchId` function
// // const getReviewsByResearchId = async (req, res) => {
// //   try {
// //     const { researchId } = req.params;
// //
// //     const reviews = await Review.find({ researchId });
// //
// //     if (!reviews.length) {
// //       return res.status(404).json({ message: 'No reviews found for this research.' });
// //     }
// //
// //     res.status(200).json(reviews);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server error.', error: error.message });
// //   }
// // };

// module.exports = {
//   addReview,
//   updateReview,
//   deleteReview,
//   // getReviewsByResearchId, // Removed
// };



