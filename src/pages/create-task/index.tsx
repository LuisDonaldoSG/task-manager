import TaskForm from '@components/form/TaskForm';
import styles from '@styles/CreateTaskPage/CreateTaskPage.module.scss';

export default function CreateTask() {

    return (
        <main className={styles.main}>
            <span className={styles.title}>Create new task</span>
            <TaskForm
                mode='create'
            />
        </main>
    );
}