import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConfig';

// routes
import rockets from './routes/rockets';

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

// cors
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express - TypeScript Server');
});

// built-in middleware for json
app.use(express.json());

// routes
app.use('/rockets', rockets);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
