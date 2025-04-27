import express from "express";
import client from "../database/pg.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM admins");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send("Invalid ID");
    };

    try {
        const result = await client.query("SELECT * FROM admins WHERE admin_id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).send("Admin not found");
        };
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).send("Username is required");
    }

    const result = await client.query(
      "INSERT INTO admins (username) VALUES ($1) RETURNING *",
      [username]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).send("Admin username already exists");
    }
    if (err.code === "23503") {
      return res.status(400).send("Must be a user to be an admin");
    }

    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const result = await client.query("DELETE FROM admins WHERE admin_id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).send("Admin not found");
    }
    res.status(200).json({
        status: "success",
        data: result.rows[0]
    });
    
  } catch (err) {
    if (err.code === "42601") {
        return res.status(400).send("Admin doesn't exist");
    }

    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
