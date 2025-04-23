import express from 'express';
import cors from 'cors';
import { client } from './pg.js';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors())

app.get('/api/notes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});