import express from 'express';
import userRouter from './routes/userRouter';
import jobRouter from './routes/jobRouter';
import applicationRouter from './routes/applicationRouter';

const app = express();

app.use(express.json());

app.use("/api/auth", userRouter)
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
})

export default app;