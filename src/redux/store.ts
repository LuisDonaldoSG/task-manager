import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '@reducers/task.reducer';
import layoutReducer from '@reducers/layout.reducer';

export const store = configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        taskReducer,
        layoutReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch