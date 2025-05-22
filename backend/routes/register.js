import express from "express";
import * as registerController from "../controllers/register.js";
import * as validation from "../middleware/validation.js";

const router = express.Router();

router.post("/signUp", validation.validateSignupUser, registerController.signUp)
router.post("/login", validation.validateLoginUser, registerController.login)

export default router