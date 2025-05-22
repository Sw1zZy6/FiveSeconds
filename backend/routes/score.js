import express from "express";
import * as scoreRouter from "../controllers/score.js";
import { validateCreateScore } from "../middleware/validation.js";
import { isAdmin } from "../middleware/auth.js";


const router = express.Router();

router.get("/", scoreRouter.getScores);
router.post("/", isAdmin, validateCreateScore, scoreRouter.createScore);

router.get("/:userId", scoreRouter.getScoreForUser)
router.delete("/:id", isAdmin, scoreRouter.deleteScore)

export default router;