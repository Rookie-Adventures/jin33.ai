import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // 这里将来添加reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
