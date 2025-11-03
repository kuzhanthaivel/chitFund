"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginController = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.summary = 'Login a user'
    // #swagger.description = 'Login a user'
    // #swagger.parameters['body'] = {
    //     in: 'body',
    //     name: 'body',
    //     description: 'User object',
    //     required: true,
    //     schema: {
    //         $ref: '#/definitions/Users'
    //     }
    // }
    // #swagger.responses[200] = {
    //     description: 'User logged in successfully.',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[400] = {
    //     description: 'Invalid username or password',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    // #swagger.responses[500] = {
    //     description: 'Server error',
    //     schema: { $ref: '#/definitions/Users' }
    // }
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = await User_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.getDataValue('password'));
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.getDataValue('id') }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json({ token });
        console.log("Login Successful");
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.loginController = loginController;
