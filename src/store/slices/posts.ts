import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios/index'
import { IFullPost } from "../../Types";
import { AppDispatch, RootState } from "../store";
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
        searchedPosts: []
    }
}


export const fetchSerachedPosts = createAsyncThunk('posts/fetchSerachedPosts', async (value: any) => {
    const { data } = await axios.get(`/post/search/${value}`)
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
        builder.addCase(fetchPosts.pending, (state: any) => {
            state.posts.items = [];
            state.posts.isLoading = true
        }),
            builder.addCase(fetchPosts.fulfilled, (state: any, action: any) => {
                state.posts.items = action.payload
                state.posts.isLoading = false;
            }),
            builder.addCase(fetchPosts.rejected, (state: any) => {
                state.posts.items = [];
                state.posts.isLoading = false;
            }),
            ///////////// delete post
            builder.addCase(deletePost.pending, (state: any, action: any) => {
                state.posts.items = state.posts.items.filter((post: any) => post._id !== action.meta.arg);
            }),
            //////////////currentPost
            builder.addCase(fetchCurrentPost.pending, (state: any) => {
                state.posts.isCurrentPostLoading = true
            }),
            builder.addCase(fetchCurrentPost.fulfilled, (state: any) => {
                state.posts.isCurrentPostLoading = false
            }),
            builder.addCase(fetchCurrentPost.rejected, (state: any) => {
                state.posts.isCurrentPostLoading = false
            }),/////////////popular posts
            builder.addCase(fetchPopularPosts.pending, (state: any) => {
                state.posts.popularPosts = []
                state.posts.isPopularPostLoading = true
            }),
            builder.addCase(fetchPopularPosts.fulfilled, (state: any, action: any) => {
                state.posts.popularPosts = action.payload
                state.posts.isPopularPostLoading = false
            }),
            builder.addCase(fetchPopularPosts.rejected, (state: any) => {
                state.posts.popularPosts = []
                state.posts.isPopularPostLoading = false
            }),
            ////////////////LastFiveTags
            builder.addCase(fetchLastFiveTags.pending, (state: any) => {
                state.posts.isLastTagsLoading = true
            }),
            builder.addCase(fetchLastFiveTags.fulfilled, (state: any, action: any) => {
                state.posts.lastFiveTags = action.payload
                state.posts.isLastTagsLoading = false
            }),
            builder.addCase(fetchLastFiveTags.rejected, (state: any) => {
                state.posts.lastFiveTags = []
                state.posts.isLastTagsLoading = false
            }),
            builder.addCase(fetchSerachedPosts.pending, (state: any) => {
                state.posts.items = []
            }),
            builder.addCase(fetchSerachedPosts.fulfilled, (state: any, action: any) => {
                state.posts.serachedPosts = action.payload
                console.log(action.payload.serachedPosts)
            }),
            builder.addCase(fetchSerachedPosts.rejected, (state: any) => {
                state.posts.items = []
            })
    },
});



export const postsReduser = postsSlice.reducer