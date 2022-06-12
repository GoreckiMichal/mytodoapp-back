import {v4 as uuid} from 'uuid';
import {TodoEntity} from "../types";
import {ValidationError} from "../utils/handleError";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type TaskRecordResult = [TaskRecord[], FieldPacket[]]

export class TaskRecord implements TodoEntity {
    public id?: string;
    public taskTodo: string;

    constructor(obj: TaskRecord) {
        if (obj.taskTodo.length < 3 || obj.taskTodo.length > 255) {
            throw new ValidationError('Nazwa zawadania nie może być krótsza niż 3 znaki, oraz nie może przekraczać 255 znkaów ')
        }
        this.id = obj.id
        this.taskTodo = obj.taskTodo
    }

    async insert():Promise <string>{
        if(!this.id){
            this.id = uuid()
        }
        await pool.execute("INSERT INTO `tasks` VALUES(:id, :taskTodo)",{
            id: this.id,
            taskTodo: this.taskTodo,
        })
        return this.id
    }
    static async listAll():Promise<TaskRecord[]>{
        const [results] = (await pool.execute("SELECT * FROM `tasks`")) as TaskRecordResult;
        return results.map(obj=>new TaskRecord(obj))
    }
    static async getOne(id:string):Promise<TaskRecord>{
        const [result] = await pool.execute("SELECT * FROM `tasks` WHERE `id`=:id",{
            id
        }) as TaskRecordResult
        return new TaskRecord(result[0])
    }

    async update(): Promise<void>{
        await pool.execute("UPDATE `tasks` SET `taskTodo` = :taskTodo WHERE `id` = :id",{
            taskTodo: this.taskTodo,
            id: this.id,
        })
    }
    static async delete(id:string):Promise<void>{
        await pool.execute("DELETE FROM `tasks` WHERE `id`= :id",{
            id,
        })
    }
}
