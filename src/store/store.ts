import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { NameSpace } from "../consts/consts";
import { postsApi } from "./Api/PostApi";


const rootReducer = combineReducers({
    [NameSpace.Posts]:postsReduser,
    [NameSpace.User]:authReducer,
    [postsApi.reducerPath]: postsApi.reducer
})

const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export default store

