import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts/consts";





export interface IInitialState {
    search: string
}

const initialState: IInitialState = {
    search: ''
}



const seacrhSlice = createSlice({
    name: NameSpace.Search,
    initialState,
    reducers: {
        searched: (state, action) => {
            state.search = action.payload
        }
    },
});



export const searchReducer = seacrhSlice.reducer

export const {
    searched
} = seacrhSlice.actions