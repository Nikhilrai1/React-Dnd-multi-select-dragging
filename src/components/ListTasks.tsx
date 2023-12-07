import { useEffect, useState } from 'react'
import { Task, statuses } from '../App';
import Board from './board/Board';


interface ListTasksProps {
  tasks: Task[];
  setTasks: (tasks: any) => void;
}
const ListTasks = ({ tasks, setTasks }: ListTasksProps) => {

  const [todos, setTodos] = useState<Task[]>([]);
  const [inProgess, setInProgress] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);



  useEffect(() => {
    const fTodos = tasks?.filter(el => el.status === "todo");
    const fInProgress = tasks?.filter(el => el.status === "inprogress")
    const fDone = tasks?.filter(el => el.status === "done")
    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone)
  }, [tasks])

  return (
    <div className='flex gap-16'>
      {statuses?.map((status, index) => (
        <Board
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgess}
          done={done}
          key={index}
        />
      ))}
    </div>
  )
}

export default ListTasks



