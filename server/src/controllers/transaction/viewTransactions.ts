import { Request, Response } from "express";
import db from "../../models/index";

export const viewTransactionsController = async (req: Request, res: Response) => {
    const { chitNoteId } = req.params;
    // #swagger.tags = ['Transaction']
    // #swagger.summary = 'View all transactions'
    // #swagger.description = 'View all transactions'
    // #swagger.security = [{ "bearerAuth": [] }]
    // #swagger.parameters['Authorization'] = {
    //     in: 'header',
    //     name: 'Authorization',
    //     type: 'string',
    //     required: true,
    //     description: 'Bearer token'
    // }
    // #swagger.responses[200] = {
    //     description: 'Transactions fetched successfully.',
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
        const user = await db.User.findByPk((req as any).user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const chitNote = await db.ChitNote.findByPk(chitNoteId);
        if (!chitNote) {
            return res.status(404).json({ message: "Chit note not found" });
        }
        if (chitNote.userId !== user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        const transactions = await db.Transaction.findAll({ where: { chitNoteId } });
        return res.status(200).json({ status: "Successfull", transactions });
    } catch (error : any) {
        console.error("Error in viewTransactionsController:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}