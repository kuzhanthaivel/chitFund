"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const addUserController = async (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Add a new user'
    // #swagger.description = 'Add a new user'
    // #swagger.parameters['body'] = {
    //     in: 'body',
    //     name: 'body',
    //     description: 'User object',
    //     required: true,
    //     schema: {
    //         $ref: '#/definitions/Users'
    //     }
    // }
    // #swagger.responses[201] = {
    //     description: 'User added successfully.',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[400] = {
    //     description: 'Invalid username or phone',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[500] = {
    //     description: 'Server error',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    try {
        const { username, phone, village } = req.body;
        const profilePic = req.file?.filename;
        const Userid = req.user;
        const validUser = await User_1.default.findByPk(Userid);
        if (!validUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const password = '0000';
        const user = await User_1.default.create({ username, phone, password, profilePic, village });
        const savedUser = await user.save();
        // validUser.MyUsers.push(savedUser.getDataValue('id'));
        // await validUser.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add user' });
    }
};
exports.addUserController = addUserController;
