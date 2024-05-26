import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { Row } from 'antd';
import { useAppSelector } from '../../store/Hooks/useSelector';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import FilterBar from '../../components/FilterBar/FilterBar';
import PostsList from '../../components/PostsList/PostsList';
import { postsApi } from '../../store/Api/PostApi';



const Main = () => {
    const [isPopular, setIsPopular] = React.useState(false)

    const { data: posts, error, isLoading: isPostsLoading } = postsApi.useGetAllPostsQuery()

    console.log(posts, error)

    // const isPostsLoading = useAppSelector((state) => state.POSTS.posts.isLoading)
    // const searchedPosts = useAppSelector((state) => state.POSTS.posts.searchedPosts)
    // const lastFiveTags = useAppSelector((state) => state.POSTS.posts.lastFiveTags)
    //Вынести состояния в дочерние компоненты, чтобы не было лишних ререндеров 

    // const useCallbackcolorTags = React.useCallback((): string => {
    //     return '#' + Math.floor(Math.random() * 16777215).toString(16);
    // }, [lastFiveTags])




    return (
        <div>
            <MemoizedMyHeader />
            <FilterBar isPostsLoading={isPostsLoading} setIsPopular={setIsPopular} />
            <Row>
                <PostsList isPostsLoading={isPostsLoading} isPopular={isPopular}  />
                <SideBar  isPostsLoading={isPostsLoading}  style={{ marginTop: '10px', position: 'sticky', top: 10, alignSelf: 'start' }} />
            </Row>
        </div>

    );
}

export default Main;