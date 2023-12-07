// import { Status, Task } from "../../App"
// import BoardHeader from "./BoardHeader";
// import SingleTask from "./SingleTask";


// interface BoardProps {
//     status: Status;
//     tasks: Task[];
//     setTasks: (tasks: Task[]) => void;
//     todos: Task[];
//     inProgress: Task[];
//     done: Task[];
// }
// const Board = ({ status, tasks, setTasks, todos, inProgress, done }: BoardProps) => {
//     let text = "Todo";
//     let bg = "bg-slate-500";
//     let taskTodoMap = todos;

//     if (status === "inprogress") {
//         text = "In Progress";
//         bg = "bg-purple-500";
//         taskTodoMap = inProgress;
//     }

//     if (status === "done") {
//         text = "Done";
//         bg = "bg-green-500";
//         taskTodoMap = done;
//     }

//     return (
//         <div className={`w-64`}>
//             <BoardHeader
//                 bg={bg}
//                 count={taskTodoMap?.length}
//                 text={text}
//             />
//             {taskTodoMap?.length > 0 && taskTodoMap?.map((task) => (
//                 <SingleTask
//                     task={task}
//                     setTasks={setTasks}
//                     tasks={tasks}
//                 />
//             ))}
//         </div>
//     )
// }

// export default Board