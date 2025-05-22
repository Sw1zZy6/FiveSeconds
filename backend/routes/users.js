import express from "express";
import { isAdmin } from "../middleware/auth.js";
import * as usersController from "../controllers/users.js";

const router = express.Router();

router.get("/", usersController.getUsers);
router.patch("/", usersController.updateUser);
router.delete("/", usersController.deleteUser);

router.get("/:id", usersController.getUser);
router.delete("/:id", isAdmin, usersController.adminDeleteUser);

export default router;