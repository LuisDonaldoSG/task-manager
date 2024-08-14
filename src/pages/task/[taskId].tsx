import { TaskI } from "@interfaces/task";
import { useAppSelector } from "@redux/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styles from '@styles/Task/Task.module.scss';
import { Button, Chip } from "@mui/material";
import { chipsColorsByPriority } from "@utils/staticData";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import dayjs from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from "@components/form/TaskForm";

export default function Task() {

    const router = useRouter();
    const { taskId } = router.query;
    const tasks = useAppSelector(state => state.taskReducer.tasks);
    const currentTask = useMemo<TaskI | undefined>(() => tasks.find(task => task.id === taskId?.toString()), [tasks]);//eslint-disable-line
    const [mode, setMode] = useState<'view' | 'edit'>('view');

    useEffect(() => {
        if (!currentTask) {
            router.back();
        }
    }, [currentTask]);//eslint-disable-line

    return currentTask && (
        <>
            {
                mode === 'view' ? <main className={styles.main}>
                    {
                        currentTask.completed && <TaskAltIcon className={styles['complete-icon']} />
                    }
                    <article className={styles['title-and-value']}>
                        <span className={styles.title}>Title</span>
                        <span className={styles.value}>{currentTask.title}</span>
                    </article>
                    <article className={styles['title-and-value']}>
                        <span className={styles.title}>Description</span>
                        <span className={styles.value}>{currentTask.description}</span>
                    </article>
                    <article className={styles['title-and-value']}>
                        <span className={styles.title}>Priority</span>
                        <span className={styles.value}>
                            <Chip
                                color={chipsColorsByPriority[currentTask.priority]}
                                label={currentTask.priority}
                                size="small"
                            />
                        </span>
                    </article>
                    <article className={styles['title-and-value']}>
                        <span className={styles.title}>Date time</span>
                        <span className={styles.value}>{dayjs(currentTask.dateTime).format('DD/MM/YYYY - hh:mm a')}</span>
                    </article>
                    <div className={styles['buttons-container']}>
                        <Button
                            startIcon={<DeleteForeverIcon />}
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                        <Button
                            startIcon={<EditIcon />}
                            variant="contained"
                            color="success"
                            onClick={() => setMode('edit')}
                        >
                            Edit
                        </Button>
                    </div>
                </main> : <TaskForm
                    mode="edit"
                    onCancel={() => setMode('view')}
                    onSubmit={() => setMode('view')}
                    defaultValues={currentTask}
                />
            }
        </>

    );
}