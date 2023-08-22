const Joi = require("joi");

exports.NewCollectionSchema = Joi.object({
    name: Joi.string().trim().min(3).max(20).required()
});

exports.UpdateCollectionSchema = Joi.object({
    name: Joi.string().trim().min(3).max(20).optional()
});