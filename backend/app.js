import express from "express";
import registerRouter from "./routes/register.js";
import userRouter from "./routes/users.js";
import quizRouter from "./routes/quiz.js";
import questionRouter from "./routes/question.js";
import optionRouter from "./routes/option.js";
import scoreRouter from "./routes/score.js";
import cors from "cors";
import helmet from "helmet";
import env from "dotenv";
import sanitizeMiddleware from "./middleware/sanitize.js";
import notFound from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errors.js";
import authenticate from "./middleware/auth.js"


env.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors());
app.use(sanitizeMiddleware);
app.use(helmet())

app.use("/v1/auth", registerRouter)

app.use(authenticate)
// add authorization
// Separate user and admin functions

app.use("/v1/users", userRouter)
app.use("/v1/quizzes", quizRouter)
app.use("/v1/questions", questionRouter)
app.use("/v1/options", optionRouter)
app.use("/v1/scores", scoreRouter)

app.use(errorHandler)
app.use(notFound)

app.listen(port, () => {
  console.log(`Running server http://localhost:${port}...`);
});
