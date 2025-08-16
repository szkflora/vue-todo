import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = 3000;

mongoose.connect(process.env.atlas_URL as string).then(() => {
  console.log('Connected to MongoDB Atlas');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express + MongoDB Atlas!');
});

app.get('/movies', async(req: Request, res: Response) => {
  const db = mongoose.connection.db;
  const moviesCollection = db?.collection('movies');
  const movies = await moviesCollection?.find({}).limit(5).toArray();
  res.json(movies);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
