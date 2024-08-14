import { Dayjs } from "dayjs";

export interface InitialStateI {
    tasks: TaskI[]
} 

export interface TaskI {
    title: string
    description: string
    priority: Priority  
    completed: boolean
    dateTime: Dayjs
    id: string
}

export type Priority = 'low' | 'high' | 'medium'