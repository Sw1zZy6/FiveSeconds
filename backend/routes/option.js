import express from "express";
import * as optionController from "../controllers/option.js";
import { validateCreateOption } from "../middleware/validation.js";
import { isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", isAdmin, validateCreateOption, optionController.createOption)

router.get("/:questionId", optionController.getOptionsFromQuestion)
router.patch("/:id", isAdmin, optionController.updateOption)
router.delete("/:id", isAdmin, optionController.deleteOption)


export default router;