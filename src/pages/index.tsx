import { Button, Chip, MenuItem, TextField } from '@mui/material';
import styles from '@styles/Home.module.scss';
import { useAppSelector } from '@redux/hooks';
import { useRouter } from 'next/router';
import { CRATE_TASK_PATH } from '@utils/paths';
import { useEffect, useMemo, useState } from 'react';
import { OrderTask, Priority, TaskI } from '@interfaces/task';
import TaskList from '@components/task/TaskList';
import dayjs from 'dayjs';

export default function Home() {

    const tasks = useAppSelector(state => state.taskReducer.tasks);
    const router = useRouter();
    const completedTasks = useMemo<TaskI[]>(() => tasks.filter(task => task.completed), [tasks]);
    const [order, setOrder] = useState<OrderTask>('default')
    const [priority, setPriority] = useState<Priority | null>(null)
    const [tasksForFiler, setTasksForFiler] = useState<TaskI[]>([])

    useEffect(() => {
        setTasksForFiler(tasks)
    }, [tasks])

    const handleFilterPriority = (priorityParam: Priority | null) => {
        setPriority(priorityParam)
        setOrder('default')
        let tempTaskForFilter = [...tasks]
        if (priorityParam) {
            tempTaskForFilter = tempTaskForFilter.filter(task => task.priority === priorityParam)
        } else {
            tempTaskForFilter = [...tasks]
        }
        setTasksForFiler(tempTaskForFilter)
    }

    const handleOrder = (order: OrderTask) => {
        setOrder(order)
        let tempTaskForFilter = [...tasksForFiler]
        if (order === 'default') {
            tempTaskForFilter = priority !== null ? [...tasks].filter(task => task.priority === priority) : [...tasks]
        }
        if (order === 'asc') {
            tempTaskForFilter.sort((taskA, taskB) => dayjs(taskB.dateTime).unix() - dayjs(taskA.dateTime).unix())
        }
        if (order === 'desc') {
            tempTaskForFilter.sort((taskA, taskB) => dayjs(taskA.dateTime).unix() - dayjs(taskB.dateTime).unix())
        }
        setTasksForFiler(tempTaskForFilter)
    }

    return (
        <main className={styles.main}>
            <article className={styles['titles-container']}>
                <span className={styles.title}>My tasks</span>
                {
                    tasks.length > 0 && <span className={styles.subtitle}>{`${completedTasks.length}/${tasks.length}`} Completed</span>
                }
            </article>
            <div className={styles['filters-container']}>
                <div className={styles.filters}>
                    <div className={styles['chips']}>
                        <span>Filter: </span>
                        <Chip
                            label='High'
                            color='error'
                            size={'small'}
                            className={styles.chip}
                            data-selected={priority === 'high'}
                            onClick={() => handleFilterPriority(priority === 'high' ? null : 'high')}
                        />
                        <Chip
                            label='Medium'
                            color='warning'
                            size='small'
                            className={styles.chip}
                            data-selected={priority === 'medium'}
                            onClick={() => handleFilterPriority(priority === 'medium' ? null : 'medium')}
                        />
                        <Chip
                            label='Low'
                            color='success'
                            size='small'
                            className={styles.chip}
                            data-selected={priority === 'low'}
                            onClick={() => handleFilterPriority(priority === 'low' ? null : 'low')}
                        />
                    </div>
                    <span>Order: </span>
                    <TextField
                        select
                        aria-label='Order'
                        value={order}
                        size='small'
                        onChange={event => handleOrder(event.target.value as OrderTask)}
                        variant='standard'
                    >
                        <MenuItem value={'default'}>Default</MenuItem>
                        <MenuItem value={'desc'}>Desc</MenuItem>
                        <MenuItem value={'asc'}>Asc</MenuItem>
                    </TextField>
                </div>
                <Button
                    variant='contained'
                    onClick={() => router.push(CRATE_TASK_PATH)}
                >
                    Add task
                </Button>
            </div>
            <TaskList tasks={tasksForFiler} />
        </main>
    );
}
