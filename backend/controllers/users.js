import prisma from "../prismaClient.js";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users });
};

export const getUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("404");
  }

  res.json({ user });
};

export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.update({
    where: { id: userId },
    data: req.body,
  });

  res.json({ user });
};

export const deleteUser = async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.delete({
    where: { id: userId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: user,
  });
};

export const adminDeleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await prisma.user.delete({
    where: { id: userId },
  });

  res.status(200).json({
    Status: "Successfully deleted",
    Data: user,
  });
};
