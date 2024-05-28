import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts/consts";


export interface IInitialState {
    isPopular: boolean
}

const initialState: IInitialState = {
    isPopular: false
}


const filterBarSlice = createSlice({
    name: NameSpace.Search,
    initialState,
    reducers: {
        setPopular: (state, action) => {
            state.isPopular = action.payload
        },
        setAll: (state, action) => {
            state.isPopular = action.payload
        }
    }
})

export const filterBarReducer = filterBarSlice.reducer

export const {
    setPopular,
    setAll
} = filterBarSlice.actions 