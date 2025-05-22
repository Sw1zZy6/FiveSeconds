import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json();
  }
};

export const isAdmin = async (req, res, next) => {
  if (!req.user.roles.includes("ADMIN")) {
    return res.status(403).json();
  }

  next();
};

export default auth;
