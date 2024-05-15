import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postsReduser } from "./slices/posts";
import { authReducer } from "./slices/auth";

// const rootReducer = combineReducers({
//     postsReduser,
//     authReducer
// })

const store = configureStore({
    reducer: {
        postsReduser,
        authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store

