import React from 'react'
import { Col } from 'antd';
import { IPostCard } from '../../Types';
import SearchedPostsList from '../SearchedPostsList/SearchedPostsList';
import PopularPostList from '../PopularPostsList/PopularPostsList';
import List from '../List/List';



export interface IPostlistProps {
    isPostsLoading: boolean,
    isPopular: boolean,
    searchedPosts: Array<IPostCard>,
}


const PostsList: React.FC<IPostlistProps> = ({ isPostsLoading, isPopular, searchedPosts }) => {


    return (
        <Col span={8} offset={6}>
            {
                !isPopular && searchedPosts.length === 0 ? <List isPostsLoading={isPostsLoading} /> : <PopularPostList isPopular={isPopular} />
            }
            <SearchedPostsList isPopular={isPopular} />
        </Col>
    )
}


export default PostsList