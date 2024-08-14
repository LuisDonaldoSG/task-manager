import { Button, Chip, IconButton } from '@mui/material';
import styles from '@styles/Home.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppSelector } from '@redux/hooks';
import dayjs from 'dayjs';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useRouter } from 'next/router';
import { CRATE_TASK_PATH, TASK_PATH } from '@utils/paths';
import { useMemo } from 'react';
import { TaskI } from '@interfaces/task';
import { chipsColorsByPriority } from '@utils/staticData';

export default function Home() {

    const tasks = useAppSelector(state => state.taskReducer.tasks);
    const router = useRouter();
    const completedTasks = useMemo<TaskI[]>(() => tasks.filter(task => task.completed), [tasks]);

    return (
        <main className={styles.main}>
            <article className={styles['titles-container']}>
                <span className={styles.title}>My tasks</span>
                {
                    tasks.length > 0 && <span className={styles.subtitle}>{`${completedTasks.length}/${tasks.length}`} Completed</span>
                }
            </article>
            <div className={styles['filters-container']}>
                <Button
                    variant='contained'
                    onClick={() => router.push(CRATE_TASK_PATH)}
                >
                    Add task
                </Button>
            </div>
            <div className={styles['table-container']}>
                {
                    tasks.length === 0 ? <div className={styles['empty-data-container']}>
                        <IconButton
                            onClick={() => router.push(CRATE_TASK_PATH)}
                        >
                            <PlaylistAddIcon
                                className={styles['add-task-icon']}
                            />
                        </IconButton>
                        <span className={styles.title}>No tasks</span>
                    </div> : <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Date time</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map(task => (
                                    <tr key={task.id}>
                                        <td data-title={'Title'}>{task.title}</td>
                                        <td className={styles.description} data-title={'Description'}>{task.description}</td>
                                        <td data-title={'Priority'}>
                                            <Chip
                                                label={task.priority}
                                                size='small'
                                                color={chipsColorsByPriority[task.priority]}
                                            />
                                        </td>
                                        <td data-title={'Date time'}>{dayjs(task.dateTime).format('DD/MM/YYYY - hh:mm a')}</td>
                                        <td>
                                            <IconButton onClick={() => router.push(`${TASK_PATH}/${task.id}`)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </td>
                                        <td className={styles['complete-container']}>
                                            {
                                                task.completed && <TaskAltIcon
                                                    className={styles['icon-completed']}
                                                />
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </div>
        </main>
    );
}
