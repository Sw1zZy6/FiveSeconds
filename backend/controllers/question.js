import prisma from "../prismaClient.js";

export const getQuestions = async (req, res) => {
  const questions = await prisma.question.findMany({
    include: { options: true },
  });
  res.json({ questions });
};

export const getQuestion = async (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = await prisma.question.findFirst({
    where: { id: questionId },
    include: { options: true },
  });

  if (!question) {
    throw new Error("404");
  }

  res.json({ question });
};

export const createQuestion = async (req, res) => {
  const question = await prisma.question.create({
    data: req.body,
  });

  res.json({ question });
};

export const updateQuestion = async (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = await prisma.question.update({
    where: { id: questionId },
    data: req.body,
  });

  res.json({ question });
};

export const deleteQuestion = async (req, res) => {
  const questionId = parseInt(req.params.id);
  const question = await prisma.question.delete({
    where: { id: questionId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: question,
  });
};
