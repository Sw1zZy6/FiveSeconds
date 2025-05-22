import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const validate = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
  }

  next();
};

export const validateSignupUser = [
  body("name").notEmpty().isString().withMessage("Must have name"),
  body("username").custom(async (users) => {
    const user = await prisma.user.findUnique({
      where: { username: users },
    });
    if (user) {
      throw new Error("Username already exists");
    }
  }),
  body("username")
    .notEmpty()
    .isString()
    .withMessage("Must have valid username"),
  body("email").isEmail().withMessage("Must have vaild email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Min 5 characters password"),
  validate,
];

export const validateLoginUser = [
  body("username")
    .notEmpty()
    .isString()
    .withMessage("Must have valid username"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Min 5 characters password"),
  validate,
];

export const validateCreateQuiz = [
  body("title")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Must have atleast 3 characters"),
  validate,
];

export const validateCreateQuestion = [
  body("quizId").notEmpty().isInt(),
  body("title")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Must have atleast 3 characters"),
  validate,
];

export const validateCreateScore = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .custom(async (userId) => {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User does not exist");
      }
    }),

  body("quizId")
    .notEmpty()
    .withMessage("Quiz ID is required")
    .custom(async (quizId) => {
      const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
      if (!quiz) {
        throw new Error("Quiz does not exist");
      }
    }),

  body("quizScore")
    .notEmpty()
    .withMessage("Quiz score is required")
    .isInt({ min: 0, max: 999 })
    .withMessage("Score must be an integer between 0 and 999"),

  validate,
];

export const validateCreateOption = [
  body("questionId")
    .notEmpty()
    .withMessage("Question ID is required")
    .custom(async (questionId) => {
      const question = await prisma.question.findUnique({
        where: { id: questionId },
      });
      if (!question) {
        throw new Error("Question does not exist");
      }
    }),

  body("text").notEmpty().withMessage("Must have atleast 1 character"),

  body("isCorrect")
    .isBoolean()
    .withMessage("Must be true or false"),

  validate,
];
