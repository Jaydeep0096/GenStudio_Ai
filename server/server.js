import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'


const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req, res) =>{
    res.send("server is start");
})

app.use(requireAuth());

app.listen(PORT, ()=>{
    console.log("Server is running port ", PORT);
});