const {
    Router
} = require("express");
const {
    addCollection,
    editCollection,
    getCollection,
    getAllcollections,
    deleteCollection,
} = require("../controllers/collections.controller");
const validate = require("../middlewares/validator.middleware");
const authenticate = require("../middlewares/authenticate");
const adminAccess = require("../middlewares/authorise");
const {
    NewCollectionSchema,
    UpdateCollectionSchema,
} = require("../schemas/collections.schema");

const collectionRouter = Router();

collectionRouter.post(
    "/",
    authenticate,
    adminAccess,
    [validate(NewCollectionSchema)],
    addCollection
);

collectionRouter.get("/", getAllcollections);

collectionRouter
    .route("/:id")
    .patch(authenticate, adminAccess, [validate(UpdateCollectionSchema)], editCollection)
    .get(getCollection)
    .delete(authenticate, adminAccess, deleteCollection);

module.exports = collectionRouter;