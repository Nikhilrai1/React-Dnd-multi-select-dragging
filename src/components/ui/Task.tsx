import { Draggable } from "react-beautiful-dnd";
import { SelectionType } from "../../App";
import { useEffect, useState } from "react";

interface Task {
    task: any;
    index: number;
    selection: SelectionType | null,
    setSelection: (selection: SelectionType | null) => void;
    columnId: string;
    isDragging: boolean;
}


const Task = ({ task, index, selection, columnId, setSelection, isDragging }: Task) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const selected = selection?.selectedItems?.find(el => el?.selectedId === task.id);

    useEffect(() => {

        // remove select if the one column task is selected and user try to select the column task of other column
        if (!selected) {
            setIsSelected(false)
        }
        if (selected) {
            setIsSelected(true)
        }
    }, [selection, selected])


    const handleSelect = () => {

        if (!isSelected && !selected) {

            let newSelect = selection?.selectedItems || [];

            // if the one column task is selected and user try to select the column task of other column
            if (selection?.columnId !== columnId) {
                newSelect = [];
            }
            newSelect?.push({
                index,
                selectedId: task?.id
            })

            setSelection({
                columnId,
                selectedItems: newSelect
            })
            setIsSelected(true);
        }
        else {
            const filterSelect = selection?.selectedItems?.filter(el => el?.selectedId !== selected?.selectedId);
            setSelection({
                columnId,
                selectedItems: filterSelect || []
            })
            setIsSelected(false);
        }
    }


    return (
        <Draggable draggableId={task?.id} index={index}>
            {(provided, snapshot) => (
                <>
                    {(!snapshot?.isDragging && isDragging && selected) ? null : <div
                        onClick={handleSelect}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`${isDragging && selected ? "bg-purple-500" : snapshot?.isDragging ? "bg-green-300" : selected ? "bg-gray-300" : "bg-gray-200"} border p-5 mb-5 flex items-center justify-between gap-5`}
                    >
                        <input type="checkbox" checked={isSelected} onChange={() => setIsSelected(prev => !prev)} />
                        <span className="flex-1">
                            {task.content}
                        </span>

                        {snapshot?.isDragging && selected &&
                            <span className='h-5 w-5 rounded-full bg-pink-500 text-white text-sm flex items-center justify-center'>
                                {selection?.selectedItems?.length}
                            </span>
                        }

                    </div>}
                </>
            )
            }
        </Draggable >
    )
}

export default Task