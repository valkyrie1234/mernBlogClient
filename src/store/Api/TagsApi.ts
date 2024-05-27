import { IPostCard } from "../../Types";
import { Endpoints } from "../../consts/consts";
import { postsApi } from "./PostApi";

export const tagsApi = postsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAlltags: builder.query<Array<string>, void>({
            query: () => ({
                url: Endpoints.lastFiveTags
            }),
            providesTags: ['Posts']
        }),
        getPostsByTags: builder.query<Array<IPostCard>, string | undefined>({
            query: (tag) => ({
                url: Endpoints.postsByTags + tag?.trim()
            }),
            providesTags: ['Posts']
        }),
    })
})


export const { useGetAlltagsQuery, useGetPostsByTagsQuery } = tagsApi