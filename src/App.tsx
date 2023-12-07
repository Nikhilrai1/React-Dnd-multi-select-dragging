import { useState } from "react"
import { initialData } from "./data/initialData";
import Column from "./components/ui/Column";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";




type ColumnId = "column-1" | "column-2";
type TaskId = "task-1" | "task-2" | "task-3" | "task-4";

export interface SelectionType {
  columnId: string;
  selectedItems: {
    index: number;
    selectedId: string;
  }[]
}

const App = () => {
  const [state, setState] = useState(initialData);

  // selection state track the selected task in column
  const [selections, setSelections] = useState<SelectionType | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // console.log("result", result)

    if (!destination) {
      // if dragging of card is outside of the dragdropcontext
      setIsDragging(false)
      return;
    }

    if (
      // if user drag the card in it's initial position
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    ) {
      setIsDragging(false)
      return;
    }

    // if user drops the item in the same column
    if (
      destination?.droppableId === source?.droppableId &&
      destination?.droppableId !== "board" &&
      source?.droppableId !== "board"
    ) {
      const column = state.columns[source?.droppableId as ColumnId];
      const newTaskIds = Array.from(column.taskIds);


      // remove source item from card
      newTaskIds?.splice(source.index, 1);

      // add source item in destination in card
      newTaskIds?.splice(destination.index, 0, draggableId)


      const columns = state?.columns;

      const newCol = {
        ...columns[source?.droppableId as ColumnId],
        taskIds: newTaskIds

      }
      setState({
        ...state,
        columns: {
          ...columns,
          [source?.droppableId as ColumnId]: newCol
        }
      })
    }

    // if user drops single item or multiple selected item in other column
    if (destination?.droppableId !== source?.droppableId) {


      const sourceColumn = state?.columns[source?.droppableId as ColumnId];
      const destinationColumn = state?.columns[destination?.droppableId as ColumnId];

      const sourceTaskIds = Array.from(sourceColumn?.taskIds);
      const destinationTaskIds = Array.from(destinationColumn?.taskIds);

      if (selections?.selectedItems && selections?.selectedItems?.length > 0) {

        // selected indexes in source to remove and add to destination column
        const indexes = selections?.selectedItems?.map(el => el?.index)
        
        const transferTasksIds: string[] = [];
        function removeElementsByMultipleIndexes(arr: string[], indexes: number[]): string[] {
          // Sort indexes in descending order to avoid issues with splicing
          indexes.sort((a, b) => b - a);

          // Remove elements at specified indexes
          for (const index of indexes) {
            transferTasksIds.push(arr[index]);
            arr.splice(index, 1);
          }

          return arr;
        }

        removeElementsByMultipleIndexes(sourceTaskIds, indexes)

        transferTasksIds.map(taskId => {
          destinationTaskIds.splice(destination?.index, 0, taskId)
        })
        setSelections(null)
      }
      else {
        // remove item from source
        sourceTaskIds.splice(source.index, 1)

        // add source item in destination
        destinationTaskIds.splice(destination?.index, 0, draggableId)
      }


      const columns = state?.columns;
      const newSourceCol = {
        ...columns[source?.droppableId as ColumnId],
        taskIds: sourceTaskIds

      }
      const newDestinationCol = {
        ...columns[destination?.droppableId as ColumnId],
        taskIds: destinationTaskIds
      }

      setState({
        ...state,
        columns: {
          ...columns,
          [source.droppableId as ColumnId]: newSourceCol,
          [destination.droppableId as ColumnId]: newDestinationCol,
        }
      })


    }



    // if user drop colum in board
    if (destination?.droppableId === "board" && source?.droppableId === "board") {
      const newColIdsOrder = Array.from(state?.columnOrder);
      // remove source col
      newColIdsOrder.splice(source.index, 1);
      // add source col ti destination index
      newColIdsOrder.splice(destination?.index, 0, draggableId)

      setState({
        ...state,
        columnOrder: newColIdsOrder
      })

    }
    setIsDragging(false)


  }







  return (
    <div className="flex items-center justify-center gap-10">

      <div>
        <h1 className="text-2xl text-blue-500 my-10">React Dnd multi select drag feature demo</h1>
        <div className="bg-green-400 grid grid-cols-2">
          <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
            {state?.columnOrder?.map((columnId, index) => {
              const column = state?.columns[columnId as ColumnId];
              const tasks = column?.taskIds?.map(taskId => state?.tasks[taskId as TaskId]);
              return (
                <Droppable key={index} droppableId='board' direction="horizontal" type='column'>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >

                      <Draggable draggableId={column.id} index={index}>
                        {(provided) => (
                          <>
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                selection={selections}
                                setSelection={setSelections}
                                isDragging={isDragging}
                              />
                            </div>
                          </>
                        )}
                      </Draggable>
                      {provided?.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}

          </DragDropContext>
        </div>
      </div>

    </div>
  )


}

export default App