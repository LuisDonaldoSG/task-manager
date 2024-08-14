import { Priority } from "@interfaces/task";

export const chipsColorsByPriority: Record<Priority, "error" | "success" | "warning"> = {
    'high': 'error',
    'medium': 'warning',
    'low': 'success'
};