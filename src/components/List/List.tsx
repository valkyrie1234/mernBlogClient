import React from 'react';
import { Col } from 'antd';
import PostCard from '../Card/PostCard';
import { IPostCard } from '../../Types';
import PostCardSkeleton from '../Card/PostCardSkeleton';



export interface ISearchedPostList {
    isPostsLoading: boolean
}

const List: React.FC<ISearchedPostList> = ({ isPostsLoading }) => {


    console.log(111)


    return (
        <Col>
            {/* {
                posts.map((el: IPostCard, i: number) => isPostsLoading ? (
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
            } */}
        </Col>
    );
}

export default List;