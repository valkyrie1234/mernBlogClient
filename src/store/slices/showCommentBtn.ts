import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts/consts";





export interface IInitialState {
    isShow: boolean 
}
const initialState: IInitialState = {
    isShow: false
}



const showCommentBtnSlice = createSlice({
    name: NameSpace.showComments,
    initialState,
    reducers: {
        showComment: (state, action) => {
            state.isShow = action.payload
        }
    },
});

export const showCommentReducer = showCommentBtnSlice.reducer

export const {
    showComment
} = showCommentBtnSlice.actions