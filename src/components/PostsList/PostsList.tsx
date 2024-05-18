import React from 'react'
import { Col } from 'antd';
import PostCard from '../Card/PostCard';
import PostCardSkeleton from '../Card/PostCardSkeleton';
import { IPostCard } from '../../Types';
import { IUserSliceType } from '../../Types/UserType';
import { IPostType } from '../../Types/PostType';


export interface IPostlistProps {
    data: IUserSliceType | null,
    posts: IPostType,
    popularPosts: Array<IPostCard>,
    isPostsLoading: boolean,
    isPopular: boolean,
    searchedPosts: Array<IPostCard>,
}


const PostsList: React.FC<IPostlistProps> = ({ data, posts, popularPosts, isPostsLoading, isPopular, searchedPosts }) => {

  
    return (
        <Col span={8} offset={6}>
            {
                !isPopular ?
                    (isPostsLoading ? [...Array(5)] : posts.items).map((el: IPostCard, i: number) => isPostsLoading ? (
                        <PostCardSkeleton key={i} />
                    ) : (
                        <PostCard
                            editable={data?._id === el.user._id}
                            key={i}
                            style={{ marginTop: 10, marginBottom: 10 }}
                            _id={el._id}
                            title={el.title}
                            imageUrl={el.imageUrl}
                            viewsCount={el.viewsCount}
                            createdAt={el.createdAt}
                            tags={el.tags}
                            user={el.user}
                            postComment={el.postComment}
                        />
                    ))
                    :
                    (isPostsLoading ? [...Array(5)] : popularPosts).map((el: IPostCard, i: number) => isPostsLoading ? (
                        <PostCardSkeleton key={i} />
                    ) : (
                        <PostCard
                            key={i}
                            style={{ marginTop: 10, marginBottom: 10 }}
                            _id={el._id}
                            title={el.title}
                            imageUrl={el.imageUrl}
                            viewsCount={el.viewsCount}
                            createdAt={el.createdAt}
                            tags={el.tags}
                            user={el.user}
                            editable={data?._id === el.user._id}
                        />
                    ))
            }
            {
                searchedPosts ? (searchedPosts?.map((el: IPostCard, i: number) => (
                    <PostCard
                        key={i}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        title={el.title}
                        imageUrl={el.imageUrl}
                        viewsCount={el.viewsCount}
                        createdAt={el.createdAt}
                        tags={el.tags}
                        user={el.user}
                        editable={data?._id === el.user._id}
                    />
                ))) : <>kek</>
            }
        </Col>
    )
}


export default PostsList