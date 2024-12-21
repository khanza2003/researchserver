const Research = require('../models/researchModel');  // Import the Research model
const User=require('../models/userModel')

// Add Research
exports.addResearchController = async (req, res) => {
    console.log("Inside addResearchController");
    const userId = req.userId;  // User's ID from JWT middleware
    console.log(userId);
    console.log(req.body);
    console.log(req.file);
    const { title, category, description } = req.body;
    const file = req.file.filename;

    try {
        // Check if research with the same title already exists
        const existingResearch = await Research.findOne({ title });
        if (existingResearch) {
            res.status(406).json("Research already exists. Please upload another.");
        } else {
            const newResearch = new Research({
                title,
                category,
                description,
                file,
                userId
            });
            await newResearch.save();
            res.status(200).json(newResearch);
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get User Research (Authorized User)
exports.getUserResearchController = async (req, res) => {
    console.log("Inside getUserResearchController");
    const userId = req.userId;  // User's ID from JWT middleware
    try {
        const userResearch = await Research.find({ userId });
        res.status(200).json(userResearch);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get All Research (Authorized User) with Search
exports.getAllResearchController = async (req, res) => {
    console.log("Inside getAllResearchController");
    const searchKey = req.query.search;  // Search query parameter
    const query = {
        title: {
            $regex: searchKey, $options: 'i'  // Case-insensitive search
        }
    };
    try {
        const allResearch = await Research.find(query);
        res.status(200).json(allResearch);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Edit Research
exports.editResearchController = async (req, res) => {
    console.log("Inside editResearchController");
    const { id } = req.params;  // Get research ID from URL parameter
    const { title, category, description } = req.body;  // Get new data from body
    const reUploadFileName = req.file ? req.file.filename : req.body.file;  // Check if file is uploaded

    const userId = req.userId;  // User's ID from JWT middleware
    console.log(id, title, category, description, reUploadFileName, userId);

    try {
        const updatedResearch = await Research.findByIdAndUpdate(
            { _id: id },
            {
                title,
                category,
                description,
                file: reUploadFileName,
                userId
            },
            { new: true }  // Return the updated document
        );
        await updatedResearch.save();
        res.status(200).json(updatedResearch);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Remove Research
exports.removeResearchController = async (req, res) => {
    console.log("Inside removeResearchController");
    const { id } = req.params;  // Get research ID from URL parameter
    try {
        const removedResearch = await Research.findByIdAndDelete({ _id: id });
        res.status(200).json(removedResearch);
    } catch (err) {
        res.status(401).json(err);
    }
};


// Controller to get research by category
// Get All Research (Authorized User) with Search and Category Filtering
exports.getResearchByCategoryController = async (req, res) => {
    console.log("Inside getResearchByCategoryController");

    // Get the search query and category from the request query parameters
    const searchKey = req.query.search; // Search query parameter
    const category = req.query.category; // Category query parameter

    // Create the query object
    const query = {};

    // Add the search filter to the query if a search keyword is provided
    if (searchKey) {
        query.title = {
            $regex: searchKey, $options: 'i'  // Case-insensitive search
        };
    }

    // Add the category filter to the query if a category is provided
    if (category) {
        query.category = category;
    }

    try {
        // Find all research matching the query
        const allResearch = await Research.find(query);
        res.status(200).json(allResearch); // Return the filtered research data
    } catch (err) {
        res.status(401).json(err); // Handle errors
    }
};



// Get Top 3 Active Users based on Research Uploads
exports.getTopActiveUsersController = async (req, res) => {
    try {
        // Step 1: Aggregate the number of research uploads per user
        const activeUsers = await Research.aggregate([
            // Group by userId and count the number of research uploads
            { 
                $group: { 
                    _id: "$userId",  // Group by userId
                    uploadCount: { $sum: 1 }  // Count the number of uploads for each user
                }
            },
            // Step 2: Sort users by the number of uploads in descending order
            { 
                $sort: { uploadCount: -1 } 
            },
            // Step 3: Limit the result to top 3 users
            { 
                $limit: 3 
            }
        ]);

        // Step 4: Retrieve the user profile details of the top 3 active users
        const topActiveUsers = await Promise.all(
            activeUsers.map(async (user) => {
                const userDetails = await User.findById(user._id);
                return {
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    uploadCount: user.uploadCount
                };
            })
        );

        res.status(200).json(topActiveUsers);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Add to Favorites
exports.addToFavoriteController = async (req, res) => {
    const { researchId } = req.body;
    try {
        const updatedResearch = await Research.findByIdAndUpdate(
            researchId,
            { isFavorite: true },
            { new: true }
        );
        res.status(200).json(updatedResearch);
    } catch (err) {
        res.status(400).json({ message: "Error adding to favorites", error: err });
    }
};

// Remove from Favorites
exports.removeFromFavoriteController = async (req, res) => {
    const { researchId } = req.body;
    try {
        const updatedResearch = await Research.findByIdAndUpdate(
            researchId,
            { isFavorite: false },
            { new: true }
        );
        res.status(200).json(updatedResearch);
    } catch (err) {
        res.status(400).json({ message: "Error removing from favorites", error: err });
    }
};

// Get User's Favorite Research
exports.getFavoriteResearchController = async (req, res) => {
    const userId = req.userId;  // User's ID from JWT middleware
    try {
        const favoriteResearch = await Research.find({ userId, isFavorite: true });
        res.status(200).json(favoriteResearch);
    } catch (err) {
        res.status(400).json({ message: "Error fetching favorite research", error: err });
    }
};

