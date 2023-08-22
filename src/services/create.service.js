const BaseService = require("./base.service");
const User = require("../models/user.model");
const Collection = require("../models/collections.model");

const userService = new BaseService(User);
const collectionService = new BaseService(Collection);

module.exports = {
    userService,
    collectionService
};