import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import './cronTasks/parseArticles.js';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

if (!process.env.DATABASE_URL || !process.env.PASSWORD) {
  throw new Error('The DATABASE_URL and/or PASSWORD environment variables are not set');
}

const PATH = process.env.DATABASE_URL.replace('<password>', process.env.PASSWORD);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openapiPath = path.join(__dirname, '../openapi.json');
const rawData = fs.readFileSync(openapiPath, 'utf8');
const swaggerDocument = JSON.parse(rawData);

mongoose
  .connect(PATH)
  .then(() => console.log('Db ok'))
  .catch((err) => console.log('Db error', err));

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

const port = process.env.PORT || 4444;

app.use('/upload', uploadRoutes);
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log('Server ok');
});
