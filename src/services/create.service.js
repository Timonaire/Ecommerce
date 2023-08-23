const BaseService = require("./base.service");
const User = require("../models/user.model");
const Collection = require("../models/collections.model");
const Product = require("../models/products.model");

const userService = new BaseService(User);
const collectionService = new BaseService(Collection);
const productService = new BaseService(Product);

module.exports = {
    userService,
    collectionService,
    productService
};