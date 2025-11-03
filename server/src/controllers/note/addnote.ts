import db from "../../models/index";
import { Request, Response } from "express";

export const addNoteController = async (req: Request, res: Response) => {
    try {
  // #swagger.tags = ['Note']
  // #swagger.summary = 'Add a new note'
  // #swagger.description = 'Add a new note'
  // #swagger.parameters['body'] = {
  //     in: 'body',
  //     name: 'body',
  //     description: 'Note object',
  //     required: true,
  //     schema: {
  //         $ref: '#/definitions/ChitNote'
  //     }
  // }
  // #swagger.responses[201] = {
  //     description: 'Note added successfully.',
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

        const { NoteName,Date, Discribtion } = req.body;
        const user = await db.User.findByPk((req as any).user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const note = await db.ChitNote.create({
            NoteName,
            Date,
            Discribtion,
            userId: user.id,
        });
        return res.status(201).json({ status: "Successfull", note });
    } catch (error : any) {
        console.error("Error in addNoteController:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
        
    }
}