import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { SelectionType } from '../../App';

interface ColumnType {
    tasks: any;
    column: any;
    selection: SelectionType | null,
    setSelection: (selection: SelectionType | null) => void;
    isDragging: boolean;
}



const Column = ({ column, tasks, isDragging, selection, setSelection }: ColumnType) => {
    return (
        <div className='m-5 border rounded-sm'>

            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${snapshot?.isDraggingOver ? "bg-green-100" : "bg-green-200"} p-5`}
                    >
                        <div className='flex items-center justify-between gap-5'>
                            <h3 className='mb-5 text-3xl'>
                                {column.title}
                            </h3>
                            <div className='h-5 w-5 rounded-full bg-blue-500 text-white text-sm flex items-center justify-center'>
                                {tasks?.length}
                            </div>
                        </div>
                        {tasks?.map((task: any, index: number) => (
                            <div key={task.id}>

                                <Task
                                    task={task}
                                    columnId={column?.id}
                                    index={index}
                                    selection={selection}
                                    setSelection={setSelection}
                                    isDragging={isDragging}
                                />
                            </div>
                        ))}
                        {provided?.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Column