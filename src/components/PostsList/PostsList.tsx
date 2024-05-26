import React from 'react'
import { Col } from 'antd';
import { postsApi } from '../../store/Api/PostApi';
import PostCard from '../Card/PostCard';
import { userApi } from '../../store/Api/UserApi';
import { useAppSelector } from '../../store/Hooks/useSelector';




export interface IPostlistProps {
    isPostsLoading: boolean,
    isPopular: boolean,
}


const PostsList: React.FC<IPostlistProps> = ({ isPopular }) => {

    const { data: user } = userApi.useGetMeQuery()
    const { data: posts, isLoading } = postsApi.useGetAllPostsQuery()
    const { data: popularPosts, isLoading: isPopularLoading } = postsApi.useGetPopularPostsQuery()
    const searchedValue = useAppSelector((state) => state.SEARCH.search)
    const {data:searchedPosts} = postsApi.useGetSearchedPostsQuery(searchedValue)

    return (
        <Col span={8} offset={6}>
            {
                !isLoading && !isPopular && posts?.map((el, i) => (
                    <PostCard
                        key={i}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        title={el.title}
                        imageUrl={el.imageUrl}
                        viewsCount={el.viewsCount}
                        createdAt={el.createdAt}
                        tags={el.tags}
                        user={el?.user}
                        editable={user?._id === el.user._id}
                        postComment={el.postComment}
                    />
                ))
            }

            {
                isPopular && !isPopularLoading && popularPosts?.map((el, i) => (
                    <PostCard
                        key={i}
                        style={{ marginTop: 10, marginBottom: 10 }}
                        _id={el._id}
                        title={el.title}
                        imageUrl={el.imageUrl}
                        viewsCount={el.viewsCount}
                        createdAt={el.createdAt}
                        tags={el.tags}
                        user={el?.user}
                        editable={user?._id === el.user._id}
                        postComment={el.postComment}
                    />
                ))
            }
            {

            }

            {/* {
                !isPopular && searchedPosts.length === 0 ? <List isPostsLoading={isPostsLoading} /> : <PopularPostList isPopular={isPopular} />
            } */}
            {/* <SearchedPostsList isPopular={isPopular} /> */}
        </Col>
    )
}


export default PostsList