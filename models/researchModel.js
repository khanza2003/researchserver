const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Science', 'Technology', 'Art'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false // New field to indicate if a research item is a favorite
    }
});

const Research = mongoose.model("Research", researchSchema);
module.exports = Research;
