import express from "express";
import cors from "cors";
import usersRouter from "../routes/users.js";
import adminsRouter from "../routes/admins.js";
import quizzesRouter from "../routes/quizzes.js";
import scoresRouter from "../routes/scores.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/users", usersRouter);
app.use("/admins", adminsRouter);
app.use("/quizzes", quizzesRouter);
app.use("/scores", scoresRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
