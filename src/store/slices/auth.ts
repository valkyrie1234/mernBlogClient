import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/index';
import { IUserReg, IUserLogin } from "../../Types";
import { NameSpace } from "../../consts/consts";
import { IUserSliceType, IUserUpdateDataType } from "../../Types/UserType";
import {  RootState } from "../store";
import { ICreateAsyncThunkType } from "../../Types/CreateAsyncThunkType";

export interface IInitialState {
    data: IUserSliceType | null,
    status: string,
}


const initialState: IInitialState = {
    data: {
        _id: '',
        fullName: '',
        email: '',
        password: '',
        token: '',
        avatarUrl: ''
    },
    status: 'loading'
}



export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params: IUserLogin) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchUserReg = createAsyncThunk('auth/fetchUserReg', async (params: IUserReg) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

// export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
//     const { data } = await axios.get('/auth/me');
//     return data;
// })

// export const fecethUpdatedUserData = createAsyncThunk<IUserSliceType, IUserUpdateDataType, ICreateAsyncThunkType>('auth/fecethUpdatedUserData',
//     async (params: IUserUpdateDataType) => {
//         const { data } = await axios.patch(`/profile/user/${params._id}`, params.data)
//         return data
//     })

const authSlice = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
            window.localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state: RootState["USER"]) => {
            state.status = 'loading'
            state.data = null;
        }),
            builder.addCase(fetchUserData.fulfilled, (state: RootState["USER"], action: any) => {
                state.data = action.payload
                window.localStorage.setItem('token', action.payload.token)
                state.status = 'success';
            }),
            builder.addCase(fetchUserData.rejected, (state: RootState["USER"]) => {
                state.status = 'error'
                state.data = null;
            }),
            // builder.addCase(fetchAuthMe.pending, (state: RootState["USER"]) => {
            //     state.status = 'loading'
            //     state.data = null;
            // }),
            // builder.addCase(fetchAuthMe.fulfilled, (state: RootState["USER"], action: any) => {
            //     state.data = action.payload
            //     state.status = 'success';
            // }),
            // builder.addCase(fetchAuthMe.rejected, (state: RootState["USER"]) => {
            //     state.status = 'error'
            //     state.data = null;
            // }),
            builder.addCase(fetchUserReg.pending, (state: RootState["USER"]) => {
                state.status = 'loading'
                state.data = null;
            }),
            builder.addCase(fetchUserReg.fulfilled, (state: RootState["USER"], action: any) => {
                state.data = action.payload
                window.localStorage.setItem('token', action.payload.token)
                state.status = 'success';
            }),
            builder.addCase(fetchUserReg.rejected, (state: RootState["USER"]) => {
                state.status = 'error'
                state.data = null;
            })////////////////updateData
    //         builder.addCase(fecethUpdatedUserData.pending, (state: RootState["USER"]) => {
    //             state.status = 'loading'
    //             state.data = null;
    //         })
    //         ,
    //         builder.addCase(fecethUpdatedUserData.fulfilled, (state: RootState["USER"], action: any) => {
    //             state.status = 'success'
    //             state.data = action.payload;
    //         }),
    //         builder.addCase(fecethUpdatedUserData.rejected, (state: RootState["USER"]) => {
    //             state.status = 'error'
    //             state.data = null;
    //         })
     },
});


export const selectIsAuth = (state: any) => Boolean(state.USER.data)

export const authReducer = authSlice.reducer

export const {
    logout
} = authSlice.actions