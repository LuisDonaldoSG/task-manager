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
        createTask(state, action: PayloadAction<TaskI>) {
            const tempTasks: TaskI[] = [...state.tasks];
            tempTasks.push({
                ...action.payload,
                completed: false,
                dateTime: dayjs(),
                id: nanoid()
            });
            state.tasks = tempTasks;
            localStorage.setItem('tasks', JSON.stringify(tempTasks));
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
            localStorage.setItem('tasks', JSON.stringify(tempTasks));
        }
    }
});

export const {
    editTask,
    createTask
} = taskSlice.actions;
export default taskSlice.reducer;