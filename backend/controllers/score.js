import prisma from "../prismaClient.js";

export const getScores = async (req, res) => {
  const scores = await prisma.score.findMany();
  res.json({ scores });
};

export const getScoreForUser = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const score = await prisma.score.findMany({
    where: { userId: userId },
  });

  if (!score) {
    throw new Error("404");
  }

  res.json({ score });
};

export const createScore = async (req, res) => {
  const score = await prisma.score.create({
    data: req.body,
  });
  res.json({ score });
};

export const deleteScore = async (req, res) => {
  const scoreId = parseInt(req.params.id);
  const score = await prisma.score.delete({
    where: { id: scoreId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: score,
  });
};
