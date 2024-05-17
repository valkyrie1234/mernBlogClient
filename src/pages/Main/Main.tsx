import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { Row } from 'antd';
import { fetchLastFiveTags, fetchPosts, fetchPopularPosts } from '../../store/slices/posts';
import { useAppSelector } from '../../store/Hooks/useSelector';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import FilterBar from '../../components/FilterBar/FilterBar';
import PostsList from '../../components/PostsList/PostsList';


const Main = () => {
    const [isPopular, setIsPopular] = React.useState(false)
    const dispatch = useAppDispatch();


    const data = useAppSelector(state => state.USER.data)
    const posts = useAppSelector(state => state.POSTS.posts)
    const popularPosts = useAppSelector((state) => state.POSTS.posts.popularPosts)
    const isPostsLoading = useAppSelector((state) => state.POSTS.posts.isLoading)
    const searchedPosts = useAppSelector((state) => state.POSTS.posts.searchedPosts)
    const lastFiveTags = useAppSelector((state) => state.POSTS.posts.lastFiveTags)


    React.useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchPopularPosts())
        dispatch(fetchLastFiveTags())
    }, [])


    return (
        <div>
            <MemoizedMyHeader />
            <FilterBar isPostsLoading={isPostsLoading} setIsPopular={setIsPopular} />
            <Row>
                <PostsList data={data} posts={posts} popularPosts={popularPosts} isPostsLoading={isPostsLoading} isPopular={isPopular} searchedPosts={searchedPosts} />
                <SideBar isPostsLoading={isPostsLoading} tags={lastFiveTags} style={{ marginTop: '10px', position: 'sticky', top: 10, alignSelf: 'start' }} />
            </Row>
        </div>

    );
}

export default Main;