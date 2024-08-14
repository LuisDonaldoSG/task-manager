import styles from '@styles/Task/TaskDetails.module.scss';
import { Button, Chip, IconButton } from "@mui/material";
import { chipsColorsByPriority } from "@utils/staticData";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import dayjs from "dayjs";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TaskDetailsI } from '@interfaces/props';
import { Modal } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '@redux/hooks';
import { deleteTask } from '@reducers/task.reducer';
import { useRouter } from 'next/router';
import { HOME_PATH } from '@utils/paths';
import { Inter } from 'next/font/google';

const font = Inter({subsets:['latin']})

export default function TaskDetails({ task, onEdit }: TaskDetailsI) {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id))
        router.push(HOME_PATH)
    }

    return (
        <section className={styles.main}>
            {
                task.completed && <TaskAltIcon className={styles['complete-icon']} />
            }
            <article className={styles['title-and-value']}>
                <span className={styles.title}>Title</span>
                <span className={styles.value}>{task.title}</span>
            </article>
            <article className={styles['title-and-value']}>
                <span className={styles.title}>Description</span>
                <span className={styles.value}>{task.description}</span>
            </article>
            <article className={styles['title-and-value']}>
                <span className={styles.title}>Priority</span>
                <span className={styles.value}>
                    <Chip
                        color={chipsColorsByPriority[task.priority]}
                        label={task.priority}
                        size="small"
                    />
                </span>
            </article>
            <article className={styles['title-and-value']}>
                <span className={styles.title}>Date time</span>
                <span className={styles.value}>{dayjs(task.dateTime).format('DD/MM/YYYY - hh:mm a')}</span>
            </article>
            <div className={styles['buttons-container']}>
                <Button
                    startIcon={<DeleteForeverIcon />}
                    variant="contained"
                    color="error"
                    type='button'
                    onClick={() => setOpenModal(true)}
                >
                    Delete
                </Button>
                <Button
                    startIcon={<EditIcon />}
                    variant="contained"
                    color="success"
                    onClick={onEdit}
                    type='button'
                >
                    Edit
                </Button>
            </div>
            <Modal
                keepMounted
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div className={`${styles['modal-content']} ${font.className}`}>
                    <header className={styles.header}>
                        <IconButton onClick={() => setOpenModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </header>
                    <span className={styles.text}>are you sure to want delete this task: <strong>{task.title}</strong>?</span>
                    <div className={styles['buttons-container']}>
                        <Button
                            color={'error'}
                            onClick={() => setOpenModal(false)}
                            >
                            Cancel
                        </Button>
                        <Button
                            color={'error'}
                            variant='contained'
                            onClick={handleDeleteTask}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    )
}