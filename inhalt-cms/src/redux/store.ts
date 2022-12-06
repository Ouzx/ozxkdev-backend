import { configureStore } from "@reduxjs/toolkit";
import { cmsCoreApi } from "./services/cmsCore";
import { pageSlice } from "./features/pageSlice";
import { postSlice } from "./features/postSlice";

const store = configureStore({
  reducer: {
    [cmsCoreApi.reducerPath]: cmsCoreApi.reducer,
    page: pageSlice.reducer,
    post: postSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cmsCoreApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
