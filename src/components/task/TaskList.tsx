import { TaskListI } from "@interfaces/props";
import { Chip, IconButton } from '@mui/material';
import styles from '@styles/Task/TaskList.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';;
import { CRATE_TASK_PATH, TASK_PATH } from '@utils/paths';
import { chipsColorsByPriority } from '@utils/staticData';
import { useRouter } from "next/router";

export default function TaskList({ tasks }: TaskListI) {

    const router = useRouter()

    return (
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
    )
}