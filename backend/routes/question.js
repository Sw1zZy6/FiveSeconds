import express from "express"
import * as questionController from "../controllers/question.js";
import { validateCreateQuestion } from "../middleware/validation.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", questionController.getQuestions)
router.post("/", isAdmin, validateCreateQuestion, questionController.createQuestion)

router.get("/:id", questionController.getQuestion)
router.patch("/:id", isAdmin, questionController.updateQuestion)
router.delete("/:id", isAdmin, questionController.deleteQuestion)

export default router