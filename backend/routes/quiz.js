import express from "express";
import * as quizController from "../controllers/quiz.js";
import { validateCreateQuiz } from "../middleware/validation.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", quizController.getQuizzes);
router.post("/", isAdmin, validateCreateQuiz, quizController.createQuiz)

router.get("/:quizId", quizController.getQuiz);
router.patch("/:quizId", isAdmin, quizController.updateQuiz);
router.delete("/:quizId", isAdmin, quizController.deleteQuiz);


export default router;