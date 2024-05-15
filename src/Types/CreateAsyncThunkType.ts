import { AppDispatch, RootState } from "../store/store";
import { AxiosInstance } from "axios";

export interface ICreateAsyncThunkType{
    dispatch: AppDispatch,
    state: RootState,
    axios: AxiosInstance
}