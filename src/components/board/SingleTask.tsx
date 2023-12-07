import { toast } from "react-toastify";
import { Task } from "../../App";

interface SingleTaskProps {
    task: Task;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

const SingleTask = ({ task, tasks, setTasks }: SingleTaskProps) => {

    const handleRemove = (taskId: string) => {
        const fTasks = tasks?.filter(el => el?.id !== taskId);
        localStorage?.setItem("tasks",JSON.stringify(fTasks))
        setTasks(fTasks);
        toast?.success("Task Removed successfully.")
    }
    return (
        <div className={`flex items-center justify-between p-4 mt-8 shadow-md rounded-md cursor-grab`}>
            <p>{task.name}</p>
            <button className="text-red-500" onClick={() => handleRemove(task?.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    )
}

export default SingleTask