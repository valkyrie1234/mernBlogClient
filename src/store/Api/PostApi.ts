import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api, BaseUrl, Endpoints } from '../../consts/consts';
import { IFullPost, IPostCard } from '../../Types';
import { ISendMessageType } from '../../Types/SendMessageType';
import { ICreatePostParam } from '../../Types/CreatePostType';



const useAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
};

export const postsApi = createApi({
    reducerPath: Api.PostsApi,
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl.url,
    }),
    tagTypes: ['Posts', 'CurrentPost', 'User'],
    endpoints: (builder) => ({
        getAllPosts: builder.query<IPostCard[], void>({
            query: () => ({
                url: Endpoints.posts
            }),
            providesTags: ['Posts'],
        }),
        getPopularPosts: builder.query<IPostCard[], void>({
            query: () => ({
                url: Endpoints.popularPosts
            }),
            providesTags: ['Posts'],
        }),
        getSearchedPosts: builder.query<IPostCard[], string>({
            query: (title) => ({
                url: `${Endpoints.serachedPosts}${title}`
            }),
        }),
        getCurrentPost: builder.query<IFullPost, string | undefined>({
            query: (id) => ({
                url: `${Endpoints.currentPost}${id}`
            }),
            providesTags: ['CurrentPost', 'Posts'],
        }),
        sendComment: builder.mutation<IPostCard, ISendMessageType>({
            query: ({ postId, comment, user }) => ({
                url: `/comment/post/${postId}`,
                method: 'PATCH',
                body: {  
                    user, 
                    comment 
                },
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['CurrentPost', 'Posts'],
        }),
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts'],
        }),
        createPost: builder.mutation<void, ICreatePostParam>({
            query: (body) => ({
                url: Endpoints.posts,
                method: 'POST',
                body,
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts'],
        }),
        updatePost: builder.mutation<IPostCard, ICreatePostParam | undefined>({
            query: (body) => ({
                url: `${Endpoints.currentPost}${body?.id}`,
                method: 'PATCH',
                body,
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts'],
        }),
    })
})


export const {
    useGetAllPostsQuery,
    useLazyGetPopularPostsQuery,
    useGetSearchedPostsQuery,
    useLazyGetSearchedPostsQuery,
    useDeletePostMutation,
    useLazyGetCurrentPostQuery,
    useSendCommentMutation,
    useUpdatePostMutation,
    useGetCurrentPostQuery,
    useGetPopularPostsQuery
} = postsApi 