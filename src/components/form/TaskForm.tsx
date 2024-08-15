import { TaskFormI } from "@interfaces/props";
import { TaskI } from "@interfaces/task";
import { Button, MenuItem, Switch, TextField } from "@mui/material";
import { createTask, editTask } from "@reducers/task.reducer";
import { useAppDispatch } from "@redux/hooks";
import styles from '@styles/Form/TaskForm.module.scss';
import { HOME_PATH } from "@utils/paths";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

export default function TaskForm({
    defaultValues,
    mode,
    onCancel,
    onSubmit
}: TaskFormI) {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { handleSubmit, register, formState: { errors }, control } = useForm<TaskI>({
        defaultValues
    });

    const submit = (data: TaskI) => {
        if (mode === 'create') {
            dispatch(createTask(data));
            router.push(HOME_PATH);
        }
        if (mode === 'edit') {
            dispatch(editTask({
                id: data.id,
                taskData: data
            }));
            if (onSubmit) {
                onSubmit();
            }
        }
    };

    return (
        <form className={styles['form-container']} onSubmit={handleSubmit(submit)}>
            <TextField
                aria-label="Title"
                label='Title'
                variant='standard'
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                {...register(`title`, { required: 'Required field' })}
            />
            <TextField
                aria-label="Description"
                label='Description'
                multiline
                rows={3}
                variant='standard'
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                {...register(`description`, { required: 'Required field' })}
            />
            <Controller
                control={control}
                name="priority"
                rules={{ required: 'Required field' }}
                render={({ field: { name, onChange, ref, value } }) => (
                    <TextField
                        aria-label="Priority"
                        label='Priority'
                        select
                        name={name}
                        value={value}
                        ref={ref}
                        variant="standard"
                        error={Boolean(errors.priority)}
                        helperText={errors.priority?.message}
                        onChange={event => onChange(event.target.value)}
                    >
                        <MenuItem value={'high'}>High</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'low'}>Low</MenuItem>
                    </TextField>
                )}
            />
            {
                mode === 'edit' && <span className={styles['switch-and-text']}>
                    Completed
                    <Controller
                        control={control}
                        name="completed"
                        render={({ field: { value, onChange } }) => (
                            <Switch
                                aria-label="Completed"
                                checked={value}
                                onChange={(_event, checked) => onChange(checked)}
                            />
                        )}
                    />

                </span>
            }
            <div className={styles['buttons-container']}>
                <Button
                    type="button"
                    onClick={() => onCancel ? onCancel() : router.back()}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    type="submit"
                >
                    {
                        mode === 'create' ? 'Create' : 'Update'
                    }
                </Button>
            </div>
        </form>
    );
}