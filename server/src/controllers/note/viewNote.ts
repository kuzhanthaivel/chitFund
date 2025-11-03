import { Request, Response } from "express";
import db from "../../models/index";

export const viewNoteController = async (req: Request, res: Response) => {
    try {
        // #swagger.tags = ['Note']
        // #swagger.summary = 'View all notes'
        // #swagger.description = 'View all notes'
        // #swagger.security = [{ "bearerAuth": [] }]
        // #swagger.parameters['Authorization'] = {
        //     in: 'header',
        //     name: 'Authorization',
        //     type: 'string',
        //     required: true,
        //     description: 'Bearer token'
        // }
        // #swagger.responses[200] = {
        //     description: 'Notes fetched successfully.',
        //     schema: { $ref: '#/definitions/ChitNote' }
        // }
        // #swagger.responses[404] = {
        //     description: 'User not found',
        //     schema: { $ref: '#/definitions/ChitNote' }
        // }
        // #swagger.responses[500] = {
        //     description: 'Server error',
        //     schema: { $ref: '#/definitions/ChitNote' }
        // }
        const user = await db.User.findByPk((req as any).user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const notes = await db.ChitNote.findAll({ where: { userId: user.id } });
        return res.status(200).json({ status: "Successfull", notes });

    } catch (error : any) {
        console.error("Error in viewNoteController:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
