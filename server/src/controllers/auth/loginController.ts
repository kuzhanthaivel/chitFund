import { Request, Response } from 'express';
import db from '../../models/index';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response) => {
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
        const user = await db.User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }
        
        const isMatch = await bcrypt.compare(password, user.getDataValue('password'));
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign(
            { userId: user.getDataValue('id') }, 
            process.env.JWT_SECRET || 'your-secret-key', 
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};