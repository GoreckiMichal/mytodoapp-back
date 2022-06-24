import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';

import {handleError} from "./utils/handleError";
import {taskRouter} from "./router/task.router";


const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(json());
app.use(handleError)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

const router = Router()

router.use(taskRouter)

app.use('/api', router)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})