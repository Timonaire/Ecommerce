const BaseService = require("./base.service");
const User = require("../models/user.model");

const userService = new BaseService(User);

module.exports = { userService};
