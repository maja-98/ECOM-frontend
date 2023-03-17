import { configureStore} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from '../features/auth/authSlice'
import itemSearchSliceReducer from "../features/items/itemSearchSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        search: itemSearchSliceReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})