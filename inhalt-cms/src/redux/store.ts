import { configureStore } from "@reduxjs/toolkit";
import { cmsCoreApi } from "./services/cmsCore";

const store = configureStore({
  reducer: {
    [cmsCoreApi.reducerPath]: cmsCoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cmsCoreApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
