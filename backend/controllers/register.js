import prisma from "../prismaClient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import env from "dotenv";
env.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { username } = req.body;

  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    res.status(404).json({ message: "User doesnt exists" });
    return;
  }

  if (!user.password) {
    res.status(401).json({ message: "error with username or password" });
    return;
  }

  const passwordValid = await bcrypt.compare(req.body.password, user.password);

  if (!passwordValid) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, roles: user.roles },
    JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  res.json({ token });
};

export const signUp = async (req, res, next) => {
  try {
    const { name, username, email } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 3);

    const newUser = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
    });

    const { password, ...userWithoutPassword } = newUser;

    const user = userWithoutPassword;

    res.status(201).json({ user });
  } catch (error) {
    return next(error);
  }
};
