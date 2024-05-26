import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { searchReducer } from "./slices/searchValue";
import { NameSpace } from "../consts/consts";
import { postsApi } from "./Api/PostApi";
import { userApi } from "./Api/UserApi";


const rootReducer = combineReducers({
    [NameSpace.Search]:searchReducer,
    [postsApi.reducerPath]: postsApi.reducer,
})

const store = configureStore({
    reducer: rootReducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware).concat(userApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


export default store

