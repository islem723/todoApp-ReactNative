import express, { Request, Response } from 'express';
import connectDB from './config/db';
import userRoutes from './Routes/user.routes';
import categoryRoutes from './Routes/category.routes';
import taskRoutes from './Routes/task.routes';
import morgan from 'morgan';
import cors from 'cors';
import jwtVerif from './middleware/jwt-verify';

const app = express();
const PORT = 8090;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/user', userRoutes);

// app.use(jwtVerif);
app.use('/category', categoryRoutes);
app.use('/tasks', taskRoutes);

connectDB(() =>
	app.listen(PORT, () => console.log(`Listening to port: ${PORT}`))
);
