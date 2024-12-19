// const express = require('express');
// const userController = require('../controllers/userController');
// const researchController = require('../controllers/researchController');
// const jwtMiddleware = require('../middlewares/jwtMiddleware');
// const multerMiddleware = require('../middlewares/multerMiddleware');

// const router = new express.Router();

// // Register - POST
// router.post('/register', userController.registerController);

// // Login - POST
// router.post('/login', userController.loginController);

// // Add Research - POST
// router.post('/add-research', jwtMiddleware, multerMiddleware.single('file'), researchController.addResearchController);

// // Get User Research - GET
// router.get('/user-research', jwtMiddleware, researchController.getUserResearchController);

// // Get All Research - GET
// router.get('/all-research', jwtMiddleware, researchController.getAllResearchController);

// // Edit Research - PUT
// router.put('/research/:id/edit', jwtMiddleware, multerMiddleware.single("file"), researchController.editResearchController);

// // Remove Research - DELETE
// router.delete('/research/:id/remove', jwtMiddleware, researchController.removeResearchController);

// // Edit User - PUT
// router.put('/user/edit', jwtMiddleware, multerMiddleware.single("profilePic"), userController.editUserController);

// module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');
const researchController = require('../controllers/researchController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multerMiddleware = require('../middlewares/multerMiddleware');
const reviewController =require('../controllers/reviewController')
const router = new express.Router();

// Register - POST
router.post('/register', userController.registerController);

// Login - POST
router.post('/login', userController.loginController);

// Add Research - POST
// Use multerMiddleware to handle file uploads
router.post('/add-research', jwtMiddleware, multerMiddleware.single('researchFile'), researchController.addResearchController);

// Get User Research - GET
router.get('/user-research', jwtMiddleware, researchController.getUserResearchController);

// Get All Research - GET
router.get('/all-research', jwtMiddleware, researchController.getAllResearchController);

// Edit Research - PUT
router.put('/research/:id/edit', jwtMiddleware, multerMiddleware.single("researchFile"), researchController.editResearchController);

// Remove Research - DELETE
router.delete('/research/:id/remove', jwtMiddleware, researchController.removeResearchController);

// Edit User - PUT
router.put('/user/edit', jwtMiddleware, multerMiddleware.single("profilePic"), userController.editUserController);

//Get Research According to category
router.get('/research', researchController.getResearchByCategoryController);

// // Add a new review
// router.post('/review', jwtMiddleware, reviewController.addReview);

// // Update a review
// router.put('/review/:id', jwtMiddleware, reviewController.updateReview);

// // Delete a review
// router.delete('/review/:id', jwtMiddleware, reviewController.deleteReview);

// Add route for getting top 3 active users
router.get('/top-active-users', multerMiddleware.single("profilePic"),researchController.getTopActiveUsersController);



module.exports = router;
