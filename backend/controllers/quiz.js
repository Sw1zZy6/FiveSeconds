import prisma from "../prismaClient.js";

export const getQuizzes = async (req, res) => {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });
  res.json({ quizzes });
};

export const getQuiz = async (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const quiz = await prisma.quiz.findFirst({
    where: { id: quizId },
    include: { questions: true },
  });

  if (!quiz) {
    throw new Error("404");
  }

  res.json({ quiz });
};

export const createQuiz = async (req, res) => {
  const quiz = await prisma.quiz.create({
    data: req.body,
  });

  res.json({ quiz });
};

export const updateQuiz = async (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const quiz = await prisma.quiz.update({
    where: { id: quizId },
    data: req.body,
  });

  res.json({ quiz });
};

export const deleteQuiz = async (req, res) => {
  const quizId = parseInt(req.params.quizId);
  const quiz = await prisma.quiz.delete({
    where: { id: quizId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: quiz,
  });
};
