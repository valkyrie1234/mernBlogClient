import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/index'
import { IFullPost } from "../../Types";
import { RootState } from "../store";
import { IPostType } from "../../Types/PostType";
import { NameSpace } from "../../consts/consts";
import { ICreateAsyncThunkType } from "../../Types/CreateAsyncThunkType";




export interface IInitialState {
    posts: IPostType
}

const initialState: IInitialState = {
    posts: {
        items: [],
        isLoading: true,
        isCurrentPostLoading: true,
        popularPosts: [],
        isPopularPostLoading: true,
        lastFiveTags: [],
        isLastTagsLoading: true,
        searchedPosts: [],
        isSearchedPostsLoading: true
    }
}


export const fetchSearchedPosts = createAsyncThunk('posts/fetchSerachedPosts', async (value: string) => {
    const { data } = value == '' ? await axios.get('/post') : await axios.get(`/post/search/${value}`) 
    return data
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/post');
    return data;
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
    const { data } = await axios.get('/post/popular');
    return data;
})

export const fetchLastFiveTags = createAsyncThunk('post/fetchLastFiveTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
})

export const fetchCurrentPost = createAsyncThunk<IFullPost, string, ICreateAsyncThunkType>
    ('posts/fetchCurrentpost',
        async (id: string) => {
            const { data } = await axios.get(`/post/${id}`);
            return data;
        })

export const deletePost = createAsyncThunk('posts/deletePost', async (id: string) => {
    axios.delete(`/post/${id}`)
})



const postsSlice = createSlice({
    name: NameSpace.Posts,
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state: RootState["POSTS"]) => {
            state.posts.items = [];
            state.posts.isLoading = true
        }),
            builder.addCase(fetchPosts.fulfilled, (state: RootState["POSTS"], action: any) => {
                state.posts.items = action.payload
                state.posts.isLoading = false;
            }),
            builder.addCase(fetchPosts.rejected, (state: RootState["POSTS"]) => {
                state.posts.items = [];
                state.posts.isLoading = false;
            }),
            ///////////// delete post
            builder.addCase(deletePost.pending, (state: RootState["POSTS"], action: any) => {
                state.posts.items = state.posts.items.filter((post: any) => post._id !== action.meta.arg);
            }),
            //////////////currentPost
            builder.addCase(fetchCurrentPost.pending, (state: RootState["POSTS"]) => {
                state.posts.isCurrentPostLoading = true
            }),
            builder.addCase(fetchCurrentPost.fulfilled, (state: RootState["POSTS"]) => {
                state.posts.isCurrentPostLoading = false
            }),
            builder.addCase(fetchCurrentPost.rejected, (state: RootState["POSTS"]) => {
                state.posts.isCurrentPostLoading = false
            }),/////////////popular posts
            builder.addCase(fetchPopularPosts.pending, (state: RootState["POSTS"]) => {
                state.posts.popularPosts = []
                state.posts.isPopularPostLoading = true
            }),
            builder.addCase(fetchPopularPosts.fulfilled, (state: RootState["POSTS"], action: any) => {
                state.posts.popularPosts = action.payload
                state.posts.isPopularPostLoading = false
            }),
            builder.addCase(fetchPopularPosts.rejected, (state: RootState["POSTS"]) => {
                state.posts.popularPosts = []
                state.posts.isPopularPostLoading = false
            }),
            ////////////////LastFiveTags
            builder.addCase(fetchLastFiveTags.pending, (state: RootState["POSTS"]) => {
                state.posts.isLastTagsLoading = true
            }),
            builder.addCase(fetchLastFiveTags.fulfilled, (state: RootState["POSTS"], action: any) => {
                state.posts.lastFiveTags = action.payload
                state.posts.isLastTagsLoading = false
            }),
            builder.addCase(fetchLastFiveTags.rejected, (state: RootState["POSTS"]) => {
                state.posts.lastFiveTags = []
                state.posts.isLastTagsLoading = false
            }),
            builder.addCase(fetchSearchedPosts.pending, (state: RootState["POSTS"]) => {
                state.posts.items = []
                state.posts.isSearchedPostsLoading = true
            }),
            builder.addCase(fetchSearchedPosts.fulfilled, (state: RootState["POSTS"], action: any) => {
                state.posts.searchedPosts = action.payload
                state.posts.isSearchedPostsLoading = false
                console.log(action.payload.serachedPosts)
            }),
            builder.addCase(fetchSearchedPosts.rejected, (state: RootState["POSTS"]) => {
                state.posts.items = []
                state.posts.isSearchedPostsLoading = false
            })
    },
});



export const postsReduser = postsSlice.reducer