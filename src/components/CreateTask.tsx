import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { Task } from '../App';
import { toast } from 'react-toastify';

interface CreateTaskProps {
    tasks: any;
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
}
const CreateTask = ({ tasks, setTasks, addTask }: CreateTaskProps) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo"
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        if (task?.name?.length < 3){
            toast.error("Required name of length greater than 2")
        };
        if (task?.name?.length > 100){
            toast.error("Required name of length less than 101")
        };
        addTask(task as Task)

    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1'
                value={task.name}
                onChange={(e) => setTask({
                    ...task,
                    id: uuidv4(),
                    name: e.target.value
                })}
            />
            <button
                className='bg-cyan-500 rounded-md px-4 h-12 text-white'
            >
                Create
            </button>
        </form>
    )
}

export default CreateTask