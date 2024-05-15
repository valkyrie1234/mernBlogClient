import { IPostCard } from "./PostCardType";


export interface IPostType {
    items: Array <IPostCard>,
    isLoading: boolean,
    isCurrentPostLoading: boolean,
    lastFiveTags: Array<string>,
    isLastTagsLoading: boolean,
    popularPosts: Array<IPostCard>,
    isPopularPostLoading: boolean,
    searchedPosts: Array <IPostCard>
}