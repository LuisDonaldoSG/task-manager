import { ReactNode } from "react";
import { PathsElementsI } from "@interfaces/paths";
import { TaskI } from "@interfaces/task";

export interface LayoutI {
    children: ReactNode
}

export interface LinkItemI {
    nameForSubPath?: string
    dataLink: PathsElementsI
}

export interface TaskFormI {
    defaultValues?: TaskI
    mode: 'edit' | 'create'
    onCancel?: () => void
    onSubmit?: () => void
}

export interface TaskDetailsI {
    task: TaskI
    onEdit: () => void
}
