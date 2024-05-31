import React from 'react'
import { Col } from 'antd';
import { postsApi } from '../../store/Api/PostApi';
import PostCard from '../Card/PostCard';
import { userApi } from '../../store/Api/UserApi';
import { useAppSelector } from '../../store/Hooks/useSelector';








const PostsList: React.FC = () => {

    const isPopular = useAppSelector((state) => state.FILTER.isPopular)
    const searchedValue = useAppSelector((state) => state.SEARCH.search)


    const { data: user } = userApi.useGetMeQuery()
    const { data: posts, isLoading } = postsApi.useGetAllPostsQuery()
    const { data: popularPosts, error } = postsApi.useGetPopularPostsQuery()

    const [getSearchedPosts, {data: searchedPosts}]= postsApi.useLazyGetSearchedPostsQuery()

    console.log(isPopular)

    React.useEffect(() => {
        // dispatch(postsApi.util.resetApiState())
        getSearchedPosts(searchedValue)
    }, [searchedValue])

    console.log(searchedPosts)
    console.log(popularPosts, error)

    return (
        <Col span={8} offset={6}>
            {
                searchedPosts === undefined && !isLoading && !isPopular && posts?.map((el) => (
                    <PostCard
                        key={el._id}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        imageUrl={el.imageUrl}
                        createdAt={el.createdAt}
                        user={el?.user}
                        editable={user?._id === el.user._id}
                    />
                ))
            }

            {
                isPopular && popularPosts?.map((el) => (
                    <PostCard
                        key={el._id}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        imageUrl={el.imageUrl}
                        createdAt={el.createdAt}
                        user={el?.user}
                        editable={user?._id === el.user._id}
                    />
                ))
            }
            {
                searchedPosts?.map((el) => (
                    <PostCard
                        key={el._id}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        imageUrl={el.imageUrl}
                        createdAt={el.createdAt}
                        user={el?.user}
                        editable={user?._id === el.user._id}
                    />
                ))
            }


            {/* {
                !isPopular && searchedPosts.length === 0 ? <List isPostsLoading={isPostsLoading} /> : <PopularPostList isPopular={isPopular} />
            } */}
            {/* <SearchedPostsList isPopular={isPopular} /> */}
        </Col>
    )
}


export default PostsList