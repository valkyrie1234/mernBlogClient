import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { NameSpace } from "../consts/consts";


const rootReducer = combineReducers({
    [NameSpace.Posts]:postsReduser,
    [NameSpace.User]:authReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export default store

