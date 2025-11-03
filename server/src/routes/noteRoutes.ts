import router from "express";
import { addNoteController } from "../controllers/note/addnote";
import { viewNoteController } from "../controllers/note/viewNote";
import { verifyToken } from "../controllers/middlewares/verifyToken";

const noteRoutes = router();

noteRoutes.post("/addNote", verifyToken, addNoteController);
noteRoutes.get("/viewNote", verifyToken, viewNoteController);
export default noteRoutes;
