import router from "express";
import { verifyToken } from "../controllers/middlewares/verifyToken";
import { addTransactionController } from "../controllers/transaction/addTransaction";
import { viewTransactionsController } from "../controllers/transaction/viewTransactions";

const transactionRoutes = router();

transactionRoutes.post("/addTransaction/:chitNoteId", verifyToken, addTransactionController);
transactionRoutes.get("/viewTransaction/:chitNoteId", verifyToken, viewTransactionsController);

export default transactionRoutes;
