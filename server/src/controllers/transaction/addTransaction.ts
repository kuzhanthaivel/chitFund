import db from "../../models/index";
import { Request, Response } from "express";

export const addTransactionController = async (req: Request, res: Response) => {
    const { chitNoteId } = req.params;
    // #swagger.tags = ['Transaction']
    // #swagger.summary = 'Add a new transaction'
    // #swagger.description = 'Add a new transaction'
    // #swagger.parameters['body'] = {
    //     in: 'body',
    //     name: 'body',
    //     description: 'Transaction object',
    //     required: true,
    //     schema: {
    //         $ref: '#/definitions/Transaction'
    //     }
    // }
    // #swagger.responses[201] = {
    //     description: 'Transaction added successfully.',
    //     schema: { $ref: '#/definitions/Transaction' }
    // }
    // #swagger.responses[404] = {
    //     description: 'Chit note not found',
    //     schema: { $ref: '#/definitions/Transaction' }
    // }
    // #swagger.responses[500] = {
    //     description: 'Server error',
    //     schema: { $ref: '#/definitions/Transaction' }
    // }
    try {
        if (!chitNoteId) {
            return res.status(400).json({ message: "Chit note ID is required" });
        }
        const { Date,ReceiptNo, Amount, TotalAmount, Total } = req.body;
        const user = await db.User.findByPk((req as any).user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const chitNote = await db.ChitNote.findByPk(chitNoteId);
        if (!chitNote) {
            return res.status(404).json({ message: "Chit note not found" });
        }
        const transaction = await db.Transaction.create({
            Date,
            ReceiptNo,
            Amount,
            TotalAmount,
            Total,
            chitNoteId: chitNote.id,
            userId: user.id,
        });
        return res.status(201).json({ status: "Successfull", transaction });
    } catch (error : any) {
        console.error("Error in addTransactionController:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}