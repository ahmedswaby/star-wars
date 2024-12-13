import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { starwarsAPI } from "./apis/index";

const store = configureStore({
  reducer: {
    [starwarsAPI.reducerPath]: starwarsAPI.reducer,
  },
  devTools: true,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(starwarsAPI.middleware)
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
