import { InitialStateI, TaskI } from "@interfaces/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

const initialState: InitialStateI = {
    tasks: []
};

const taskSlice = createSlice({
    initialState,
    name: 'tasks',
    reducers: {
        setTasks(state, action: PayloadAction<TaskI[]>){
            state.tasks = action.payload
        },
        createTask(state, action: PayloadAction<TaskI>) {
            const tempTasks: TaskI[] = [...state.tasks];
            tempTasks.push({
                ...action.payload,
                completed: false,
                dateTime: dayjs(),
                id: nanoid()
            });
            state.tasks = tempTasks;
        },
        editTask(state, action: PayloadAction<{ id: string, taskData: TaskI }>) {
            const tempTasks: TaskI[] = [...state.tasks];
            state.tasks = tempTasks.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload.taskData;
                } else {
                    return task;
                }
            });
        },
        deleteTask(state, action: PayloadAction<string>) {
            const tempTasks: TaskI[] = [...state.tasks]
            state.tasks = tempTasks.filter(task => task.id !== action.payload)
        }
    }
});

export const {
    editTask,
    createTask,
    deleteTask,
    setTasks
} = taskSlice.actions;
export default taskSlice.reducer;