import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { Row } from 'antd';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import FilterBar from '../../components/FilterBar/FilterBar';
import PostsList from '../../components/PostsList/PostsList';
import { postsApi } from '../../store/Api/PostApi';



const Main = () => {
 

    const { data: posts, error, isLoading: isPostsLoading } = postsApi.useGetAllPostsQuery()



    return (
        <div>
            <MemoizedMyHeader />
            <FilterBar />
            <Row>
                <PostsList />
                <SideBar  isPostsLoading={isPostsLoading}  style={{ marginTop: '10px', position: 'sticky', top: 10, alignSelf: 'start' }} />
            </Row>
        </div>

    );
}

export default Main;