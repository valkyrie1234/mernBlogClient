import { IUserReg } from '../../Types';
import { IUserSliceType } from '../../Types/UserType';
import { Endpoints } from '../../consts/consts';
import { postsApi } from './PostApi';


const useAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
};

export const userApi = postsApi.injectEndpoints({
    endpoints: (builder) => ({
        updateUserData: builder.mutation({
            query: ({ _id, email, avatarUrl, fullName }) => ({
                url: `/profile/user/${_id}`,
                method: 'PATCH',
                body: {
                    email: email,
                    avatarUrl: avatarUrl,
                    fullName: fullName
                },
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts', 'User']
        }),
        userRegistartion: builder.mutation< IUserSliceType, IUserReg>({
            query: ({ email, password, fullName }) => ({
                url: Endpoints.registartion,
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                    fullName: fullName
                }
            }),
            invalidatesTags: ['Posts', 'User']
        }),
        userLogin: builder.mutation({
            query: ({ email, password }) => ({
                url: Endpoints.login,
                method: 'POST',
                body: {
                    email: email,
                    password: password,
                }
            }),
            invalidatesTags: ['Posts', 'User']
        }),
        getMe: builder.query<any, void>({
            query: () => ({
                url: '/auth/me',
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            providesTags: ['User']
        })
    })
})

export const { useUpdateUserDataMutation, useGetMeQuery, useUserRegistartionMutation, useUserLoginMutation } = userApi