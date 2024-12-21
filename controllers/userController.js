const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register (with firstName, lastName, email, and password)
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);

    try {
        // Check if the user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(406).json("User already exists. Please Login!");
        } else {
            // Create a new user with default values for optional fields
            const newUser = new users({
                firstName,
                lastName,
                email,
                password,
                phone: "",
                address: "",
                education: "",
                profilePic: ""
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(err);
        console.log(err);
        
    }
}

// Login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Check if the user exists with matching email and password
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            // Generate a JWT token
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);
            res.status(200).json({
                user: existingUser,
                token
            });
        } else {
            res.status(404).json("Invalid Email or Password");
        }
    } catch (err) {
        res.status(401).json(err);
    }
}

// Profile Update
exports.editUserController = async (req, res) => {
    console.log("Inside editUserController");
    // Get user ID from JWT Middleware (req.userId)
    const userId = req.userId;

    // Get the data from the request body and file (via multer)
    const { firstName, lastName, email, password, phone, address, dateOfBirth, education, profilePic } = req.body;
    const uploadProfileImgFile = req.file ? req.file.filename : profilePic;  // Use uploaded file if present, otherwise keep existing file

    try {
        // Update the user's profile using findByIdAndUpdate
        const updatedUser = await users.findByIdAndUpdate(
            { _id: userId },
            {
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
                education,
                profilePic: uploadProfileImgFile
            },
            { new: true }  // Return the updated user document
        );
        await updatedUser.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(401).json(err);
    }
}


  


