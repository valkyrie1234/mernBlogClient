import { IPostCard } from "../../Types";
import { Endpoints } from "../../consts/consts";
import { postsApi } from "./PostApi";

export const tagsApi = postsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAlltags: builder.query<any, void>({
            query: () => ({
                url: Endpoints.lastFiveTags
            }),
            providesTags: ['Posts']
        }),
        getPostsByTags: builder.query<Array<IPostCard>, string | undefined>({
            query: (tag) => ({
                url: Endpoints.postsByTags + tag
            }),
            providesTags: ['Posts']
        }),
    })
})


export const { useGetAlltagsQuery, useGetPostsByTagsQuery } = tagsApi