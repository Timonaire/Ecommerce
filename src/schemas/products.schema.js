const Joi = require("joi");

exports.NewProductSchema = Joi.object({
    title: Joi.string().trim().min(3).max(50).required(),
    style: Joi.string().trim().optional(),
    color: Joi.string().trim().optional(),
    material: Joi.string().trim().optional(),
    neckline: Joi.string().trim().optional(),
    sleeveLength: Joi.string().trim().optional(),
    length: Joi.string().trim().optional(),
    size: Joi.string().trim().required(),
    collection: Joi.string().trim().required(),
    condition: Joi.string().trim().optional(),
    price: Joi.number().required(),
});

exports.UpdateProductSchema = Joi.object({
    title: Joi.string().trim().min(3).max(50).required(),
    style: Joi.string().trim().optional(),
    color: Joi.string().trim().optional(),
    size: Joi.string().trim().optional(),
    collection: Joi.string().trim().required(),
    material: Joi.string().trim().optional(),
    neckline: Joi.string().trim().optional(),
    sleeveLength: Joi.string().trim().optional(),
    length: Joi.string().trim().optional(),
    condition: Joi.string().trim().optional(),
    price: Joi.number().optional(),
});