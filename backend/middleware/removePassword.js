export const removePassword = (req, res, next) => {
  if (!req.user) {
    // Just skip sanitizing, don't send a response
    return next();
  }

  const { password, ...safeUser } = req.user;
  req.user = safeUser;

  next();
};