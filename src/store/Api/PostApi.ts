import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api, BaseUrl, Endpoints } from '../../consts/consts';
import { IPostCard } from '../../Types';


const useAuthToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : undefined;
};

export const postsApi = createApi({
    reducerPath: Api.PostsApi,
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl.url,
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getAllPosts: builder.query<IPostCard[], void>({
            query: () => ({
                url: Endpoints.posts
            }),
            providesTags:  ['Posts'],
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
        deletePost: builder.mutation({
            query: (id: any) => ({
                url: `/post/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: useAuthToken()
                }
            }),
            invalidatesTags: ['Posts'] ,
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
            invalidatesTags: ['Posts'] ,
        }),
    })
})


export const { useGetAllPostsQuery, useLazyGetPopularPostsQuery, useGetSearchedPostsQuery, useLazyGetSearchedPostsQuery, useDeletePostMutation } = postsApi 