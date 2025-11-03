"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const User_1 = __importDefault(require("../models/User"));
const uploadImage = async (req, res) => {
    // #swagger.tags = ['Dashboard']
    // #swagger.summary = 'Upload a file'
    // #swagger.description = 'Upload a file'
    // #swagger.responses[200] = {
    //     description: 'Image uploaded successfully.',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.parameters['Authorization'] = {
    //     in: 'header',
    //     name: 'Authorization',
    //     type: 'string',
    //     required: true,
    //     description: 'Bearer token'
    // }
    // #swagger.consumes = ['multipart/form-data']
    // #swagger.parameters['image'] = {
    //     in: 'formData',
    //     name: 'image',
    //     type: 'file',
    //     required: true,
    //     description: 'Image file to upload as profile picture'
    // }
    // #swagger.responses[400] = {
    //     description: 'No image file was uploaded.',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[500] = {
    //     description: 'Server error',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file was uploaded.' });
        }
        const userId = req.user;
        const profilePicFilename = req.file.filename;
        console.log(profilePicFilename);
        const updatedUser = await User_1.default.update({ profilePic: profilePicFilename }, { where: { id: userId } });
        if (!updatedUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        console.log(imageUrl);
        res.status(200).json({
            message: 'Image uploaded successfully!',
            imageUrl: imageUrl,
            data: {
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size,
            },
            body: req.body,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during upload.', error: error.message });
    }
};
exports.uploadImage = uploadImage;
