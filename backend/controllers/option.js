import prisma from "../prismaClient.js";

export const getOptionsFromQuestion = async (req, res) => {
  const questionId = parseInt(req.params.questionId);
  const options = await prisma.option.findMany({
    where: { questionId: questionId },
  });

  res.json({ options });
};

export const createOption = async (req, res) => {
  const option = await prisma.option.create({
    data: req.body,
  });
  res.json({ option });
};

export const updateOption = async (req, res) => {
  const optionId = parseInt(req.params.id);
  const option = await prisma.option.update({
    where: { id: optionId },
    data: req.body,
  });

  res.json({ option });
};

export const deleteOption = async (req, res) => {
  const optionId = parseInt(req.params.id);
  const option = await prisma.option.delete({
    where: { id: optionId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: option,
  });
};
