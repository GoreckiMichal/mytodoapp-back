import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/handleError";
import {taskRouter} from "./router/task.router";


const app=express();

app.use(cors({
    origin: 'https://localhost:3000'
}))
app.use(json());
app.use(handleError)
app.use(taskRouter)

app.listen(3001,'0.0.0.0',()=>{
    console.log('Listening on port http://localhost:3001')
})