import React from 'react';
import { Col } from 'antd';
import { useAppSelector } from '../../store/Hooks/useSelector';
import PostCard from '../Card/PostCard';
import { IPostCard } from '../../Types';
import PostCardSkeleton from '../Card/PostCardSkeleton';


export interface ISearchedPostList {
    isPopular: boolean
}

const PopularPostList: React.FC<ISearchedPostList> = ({ isPopular }) => {

    const data = useAppSelector(state => state.USER.data)
    const popularPosts = useAppSelector((state) => state.POSTS.posts.popularPosts)
    const isPostsLoading = useAppSelector((state) => state.POSTS.posts.isLoading)

    return (
        <Col>
            {
                isPopular && (isPostsLoading ? [...Array(5)] : popularPosts).map((el: IPostCard, i: number) => isPostsLoading ? (
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
        </Col>
    );
}

export default PopularPostList;