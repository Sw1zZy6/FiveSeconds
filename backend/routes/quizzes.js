import express from "express";
import client from "../database/pg.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * fROM quizzes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json("Invalid quiz ID");
  }

  try {
    const result = await client.query(
      "SELECT * FROM quizzes WHERE quiz_id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json("Quiz not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { admin_username, question, answer } = req.body;
  if (!admin_username || !question || !answer) {
    return res.status(400).json("Missing required fields");
  }

  try {
    const result = await client.query(
      "INSERT INTO quizzes (admin_username, question, answer) VALUES ($1, $2, $3) RETURNING *",
      [admin_username, question, answer]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json("Quiz already exists");
    }
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json("Invalid quiz ID");
  }

  try {
    const result = await client.query(
      "DELETE FROM quizzes WHERE quiz_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json("Quiz not found");
    };

    res.status(200).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  };
});

export default router;
