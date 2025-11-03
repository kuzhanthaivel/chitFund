import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../../models/index';
import bcrypt from 'bcryptjs';

export const signUpController = async (req: Request, res: Response) => {

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
        const hashedPassword = await bcrypt.hash(password, 10);
        const [user, created] = await db.User.findOrCreate({
            where: {
                [Op.or]: [
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
        } else {
            res.status(201).json({ status: "Successfull", user });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};