const notFound = (req, res, next) => {
    res.status(404).json({ error: "route not Found" });
};

export default notFound;