import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRoute from './routes/aiRouter.js';
import userRouter from './routes/userRoutes.js';
import connectCloudinary from "./configs/cloudinary.js";

const PORT = process.env.PORT || 4000;

const app = express();
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req, res) =>{
    res.send("server is start");
    // console.log(process.env.HUGGING_FACE);
    // console.log(process.env.DATABASE_URL)
})

app.use(requireAuth());
app.use("/api/ai", aiRoute);
app.use("/api/user", userRouter);

app.listen(PORT, ()=>{
    console.log("Server is running port ", PORT);
});