const {
    Schema,
    model
} = require("mongoose");

// Define the schema for collections
const collectionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Create a model for collections
const Collection = model("Collection", collectionSchema);
module.exports = Collection;