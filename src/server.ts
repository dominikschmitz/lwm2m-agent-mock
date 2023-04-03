import dotenv from 'dotenv';
import express from 'express';
import { createDatabase } from './database.js';
import router from './router.js';

dotenv.config();
const PORT = process.env.PORT || 1337;

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());
app.use('/', router);

await createDatabase();

app.listen(PORT, () => {
  console.log(`${process.env.APPLICATION_NAME} started on port ${process.env.PORT}`);
});