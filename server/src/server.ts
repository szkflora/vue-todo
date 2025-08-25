import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import taskRouter from './routes/tasks'

dotenv.config();

const app = express();
app.use(cors());
const port: number = 3000;

mongoose.connect(process.env.atlas_URL as string).then(() => {
  app.use('/tasks', taskRouter);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
