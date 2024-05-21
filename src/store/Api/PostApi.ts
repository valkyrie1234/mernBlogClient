import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api, BaseUrl, Endpoints } from '../../consts/consts';
import { IFullPost, IPostCard } from '../../Types';


const useAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
};

export const postsApi = createApi({
    reducerPath: Api.PostsApi,
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl.url,
    }),
    tagTypes: ['Posts', 'CurrentPost'],
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
                url: `${Endpoints.serachedPosts} + ${title}`
            }),
            providesTags: ['Posts'],
        }),
        getCurrentPost: builder.query<IFullPost, string>({
            query: (id) => ({
                url: `${Endpoints.currentPost}${id}`
            }),
            providesTags: ['CurrentPost'],
        }),
        sendComment: builder.mutation<any, any>({
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
            invalidatesTags: ['CurrentPost'],
        }),
        deletePost: builder.mutation({
            query: (id: any) => ({
                url: `/post/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts'],
        }),
        createPost: builder.mutation({
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
    })
})


export const {
    useGetAllPostsQuery,
    useLazyGetPopularPostsQuery,
    useGetSearchedPostsQuery,
    useLazyGetSearchedPostsQuery,
    useDeletePostMutation,
    useLazyGetCurrentPostQuery,
    useSendCommentMutation
} = postsApi 