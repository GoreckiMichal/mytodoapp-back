import {Router} from "express";
import {TaskRecord} from "../records/task.record";

export const taskRouter = Router()
    .get('/', async (req, res) => {
        const tasks = await TaskRecord.listAll()
        res.json(tasks)
    })
    .get('/next-year', async(req,res)=>{
        const nextYearTasks = await TaskRecord.nextYear()
        res.json(nextYearTasks)
    })
    .get('/:id', async (req, res) => {
        const taskId = await TaskRecord.getOne(req.params.id)
        res.json(taskId)
    })
    .patch('/:id', async(req,res)=>{
        const updateTask = await TaskRecord.getOne(req.params.id);
        const data = {
            id: req.params.id,
            ...req.body,
            taskTodo: req.body.taskTodo
        }
        const newTask = new TaskRecord(data)
        await newTask.update()
        res.json(updateTask)
    })
    .delete('/:id/', async (req, res) => {
        const taskDelete = await TaskRecord.delete(req.params.id);
        res.json(taskDelete)

    })
    .post('/add/', async(req,res)=>{
       const addTask = new TaskRecord(req.body)
        await addTask.insert()
        res.json(addTask)
    })