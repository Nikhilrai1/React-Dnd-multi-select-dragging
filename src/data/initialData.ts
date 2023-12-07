export const initialData = {
    tasks: {
        "task-1": {
            id: "task-1",
            content: "Take out the garbage"
        },
        "task-2": {
            id: "task-2",
            content: "Watch movie"
        },
        "task-3": {
            id: "task-3",
            content: "Charge phone"
        },
        "task-4": {
            id: "task-4",
            content: "code"
        },

        "task-5": {
            id: "task-5",
            content: "Research"
        },
        "task-6": {
            id: "task-6",
            content: "Play Video Game"
        },
        "task-7": {
            id: "task-7",
            content: "Play Footbal"
        },
        "task-8": {
            id: "task-8",
            content: "Dance"
        },

    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To Do",
            taskIds: ["task-1", "task-2", "task-3", "task-4"]
        },
        "column-2": {
            id: "column-2",
            title: "Progress",
            taskIds: ["task-5", "task-6", "task-7", "task-8"]
        }
    },

    // facilitate reordering of the columns
    columnOrder: ["column-1","column-2"]

}