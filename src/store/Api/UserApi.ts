import { postsApi } from './PostApi';
postsApi

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

export const { useUpdateUserDataMutation, useGetMeQuery } = userApi