import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import PostCard from '../../components/Card/PostCard';
import { useAppDispatch } from '../../store/Hooks/useDispatch';
import { Row, Col, Button, Skeleton, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { fetchLastFiveTags, fetchPosts, fetchPopularPosts, fetchSearchedPosts } from '../../store/slices/posts';
import { useAppSelector } from '../../store/Hooks/useSelector';
import SideBarSkeleton from '../../components/SideBar/SideBarSkeleton';
import PostCardSkeleton from '../../components/Card/PostCardSkeleton';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import useDebounce from '../../customHooks/useDebounce';


const Main = () => {
    const [isPopular, setIsPopular] = React.useState(false)
    const dispatch = useAppDispatch();
    const [search, setSearch] = React.useState<string>('')

    const debouncedSearch = useDebounce(search, 1000)

    const data = useAppSelector(state => state.USER.data)
    const posts = useAppSelector(state => state.POSTS.posts)
    const popularPosts = useAppSelector((state) => state.POSTS.posts.popularPosts)
    const isPostsLoading = useAppSelector((state) => state.POSTS.posts.isLoading)
    const searchedPosts = useAppSelector((state) => state.POSTS.posts.searchedPosts)
    const lastFiveTags = useAppSelector((state) => state.POSTS.posts.lastFiveTags)
    const isSearchedPostsloading = useAppSelector((state) => state.POSTS.posts.isSearchedPostsLoading)



    const showPopular = (): void => {
        setIsPopular(true)
    }
    const showAll = (): void => {
        setIsPopular(false)
    }

    const onChangeHandler = (event: any) => {
        setSearch(event.target.value)
    }

    React.useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchPopularPosts())
        dispatch(fetchLastFiveTags())
    }, [])
    React.useEffect(() => {
        dispatch(fetchSearchedPosts(debouncedSearch))
    }, [debouncedSearch])


    return (
        <div>
            <MemoizedMyHeader />
            <Row style={{ paddingTop: 20 }}>
                {
                    isPostsLoading
                        ? (<Col offset={6} span={1} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Skeleton.Button active />
                            <Skeleton.Button active />
                        </Col>)
                        : (<Col offset={6} span={4} style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                            <div style={{ display: 'flex', background: 'white', alignItems:'center' }}>
                                <Input
                                    type="text"
                                    placeholder='search...'
                                    value={search}
                                    style={{ borderRadius: 0, border:0 }}
                                    onChange={onChangeHandler}
                                />
                                {
                                    isSearchedPostsloading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 20, marginLeft:-40 }} spin />} /> : ''
                                }
                                

                            </div>
                            <Button style={{ borderRadius: 0, border: '0px' }} onClick={showAll}>all</Button>
                            <Button style={{ borderRadius: 0, border: '0px', borderLeft: '1px solid gray' }} onClick={showPopular}>popular</Button>
                        </Col>)
                }
            </Row>
            <Row>
                <Col span={8} offset={6}>
                    {
                        !isPopular ?
                            (isPostsLoading ? [...Array(5)] : posts.items).map((el, i) => isPostsLoading ? (
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
                            (isPostsLoading ? [...Array(5)] : popularPosts)?.map((el, i) => isPostsLoading ? (
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
                        searchedPosts ? (searchedPosts?.map((el, i) => (
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
                {
                    isPostsLoading
                        ? (<SideBarSkeleton />)
                        : (<SideBar tags={lastFiveTags} style={{ marginTop: '10px', position: 'sticky', top: 10, alignSelf: 'start' }} />)
                }

            </Row>
        </div>

    );
}

export default Main;