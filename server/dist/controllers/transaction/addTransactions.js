"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransactionController = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Transaction_1 = __importDefault(require("../../models/Transaction"));
const addTransactionController = async (req, res) => {
    try {
        const PaidByUserId = req.user.id;
        const { amount, type, description, PaidToUserId } = req.body;
        const PaidByUser = await User_1.default.findByPk(PaidByUserId);
        const PaidToUser = await User_1.default.findByPk(PaidToUserId);
        if (!PaidByUser) {
            return res.status(404).json({ error: 'Unauthorized' });
        }
        if (!PaidToUser) {
            return res.status(404).json({ error: 'PaidToUser not found' });
        }
        if (PaidByUserId === PaidToUserId) {
            return res.status(404).json({ error: 'PaidByUser and PaidToUser are the same' });
        }
        const transaction = await Transaction_1.default.create({
            amount,
            type,
            description,
            PaidByUserId,
            PaidToUserId
        });
        res.status(201).json(transaction);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add transaction' });
    }
};
exports.addTransactionController = addTransactionController;
