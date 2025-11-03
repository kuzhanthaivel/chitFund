"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = void 0;
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUpController = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Sign up a new user'
    // #swagger.description = 'Sign up a new user'
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
    //     description: 'User created successfully.',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[400] = {
    //     description: 'Username or phone already exists',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[500] = {
    //     description: 'Server error',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    const { username, password, phone } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    if (!phone) {
        return res.status(400).json({ message: 'Phone is required' });
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [user, created] = await User_1.default.findOrCreate({
            where: {
                [sequelize_1.Op.or]: [
                    { username: username },
                    { phone: phone },
                ]
            },
            defaults: {
                username,
                phone,
                password: hashedPassword,
            },
        });
        if (!created) {
            return res.status(400).json({ message: 'Username or phone already exists' });
        }
        else {
            console.log("Account Created Successfully");
            res.status(201).json({ status: "Successfull", user });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.signUpController = signUpController;
