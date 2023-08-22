const {
    collectionService,
    productService
} = require("../services/create.service");
const {
    isValidObjectId
} = require("../utilities/id.utilities");
const notify = require('../services/mail.service')
const Mails = require('../configs/mailResponses.config')

class CollectionController {
    //Create collection
    async addCollection(req, res) {
        try {
            //check to see if a collection with name exists
            const existingCollection = await collectionService
                .findOne({
                    name: req.body.name,
                    deleted: false,
                });

            //sends an error if the name exists
            if (existingCollection) {
                return res.status(403).json({
                    success: false,
                    message: "This collection already exists",
                });
            }

            //create a collection if the name doesn't exist
            const createdCollection = await collectionService
                .create({
                    name: req.body.name,
                });

            await createdCollection.save();

            // Sends email notification
            await notify.sendMail(
                req.session.user,
                req.session.user.email,
                Mails.collectionCreated.subject,
                Mails.collectionCreated.body
            );

            // Returns credentials to the client side
            return res.status(201).json({
                success: true,
                message: "collection created successfully",
                data: createdCollection,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    // Get all collections
    async getcollections(req, res) {
        try {
            const collections = await collectionService
                .findAll({
                    deleted: false,
                });

            if (!collections) {
                res.status(404).json({
                    success: false,
                    message: "collections not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "collections fetched successfully",
                data: collections,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    // Get a collection
    async getcollection(req, res) {
        try {
            if (!isValidObjectId(req.params.id)) {
                return res.status(403).json({
                    success: false,
                    message: `${req.params.id} is not a valid id`
                });
            }

            const collection = await collectionService
                .findOne({
                    _id: req.params.id,
                    deleted: false,
                });

            if (!collection) {
                return res.status(404).json({
                    success: false,
                    message: "This collection does not exist",
                });
            }

            const foundProductsForThiscollection = await productService.findAll({
                collection: collection,
                deleted: false
            })

            if (!foundProductsForThiscollection) {
                return res.status(200).json({
                    success: true,
                    message: "collection fetched successfully",
                    collection: collection,
                    products: 'There are no products under this collection'
                });
            }

            return res.status(200).json({
                success: true,
                message: "collection fetched successfully",
                collection: collection,
                products: foundProductsForThiscollection
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    // Edit a collection
    async editcollection(req, res) {
        try {
            if (!isValidObjectId(req.params.id)) {
                return res.status(403).json({
                    message: `${req.params.id} is not a valid id`,
                    success: false,
                });
            }

            const existingCollection = await collectionService
                .findOne({
                    _id: req.params.id
                });

            if (!existingCollection) {
                return res.status(404).json({
                    success: false,
                    message: "collection not found",
                });
            }

            const updateData = {
                name: req.body.name
            }

            const updatedcollection = await collectionService
                .updateOne(
                    req.params.id,
                    updateData
                );

            await updatedcollection.save()

            await notify.sendMail(
                req.session.user,
                req.session.user.email,
                Mails.collectionUpdated.subject,
                Mails.collectionUpdated.body
            );

            return res.status(200).json({
                success: true,
                message: "collection updated successfully",
                data: updatedcollection,
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    // Delete a collection
    async deletecollection(req, res) {
        try {
            if (!isValidObjectId(req.params.id)) {
                return res.status(403).json({
                    success: false,
                    message: `${req.params.id} is not a valid id`,
                });
            }

            const existingCollection = await collectionService
                .findOne({
                    _id: req.params.id
                });

            if (!existingCollection) {
                return res.status(404).json({
                    success: false,
                    message: "collection not found",
                });
            }

            // Delete the collection
            const deletedcollection = await collectionService
                .deleteOne(req.params.id);

            await notify.sendMail(
                req.session.user,
                req.session.user.email,
                Mails.collectionDeleted.subject,
                Mails.collectionDeleted.body
            );

            return res.status(200).json({
                success: true,
                message: "collection deleted successfully",
                data: deletedcollection
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

module.exports = new CollectionController();