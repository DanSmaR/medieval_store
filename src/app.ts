import 'express-async-errors';
import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

export default app;
