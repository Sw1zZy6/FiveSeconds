export const errorHandler = (err, req, res, next) => {

  if (err.message === "404" || err.code === "P2025") {
    res.status(404).json({ error: "Not Found" });
  }

   console.error("Error caught by middleware:", err);
   // res.status(500).json({ error: "Internal Server Error" });
   next(err);
};