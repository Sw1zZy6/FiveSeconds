import prisma from "../prismaClient.js";

const removePasswords = (req, res, next) => {
  // Only activate after user is authenticated
  if (!req.user) return next();

  const originalJson = res.json;

  res.json = function (data) {
    const scrubbed = JSON.parse(JSON.stringify(data, (key, value) => {
      if (key === "password") return undefined;
      return value;
    }));
    return originalJson.call(this, scrubbed);
  };

  next();
};

export default removePasswords;