import React from 'react';
import { Col, Typography } from 'antd';
import PostCard from '../Card/PostCard';
import { IPostCard } from '../../Types';
import { postsApi } from '../../store/Api/PostApi';
import { userApi } from '../../store/Api/UserApi';

const { Title } = Typography;

export interface ISearchedPostList {
    isPopular: boolean
}

const SearchedPostsList: React.FC<ISearchedPostList> = ({ isPopular }) => {

    // const data = useAppSelector(state => state.USER.data)


    const {data:user} = userApi.useGetMeQuery()
    // const { data: posts, error } = postsApi.useGetAllPostsQuery()
    const { data: posts, error } = postsApi.useGetAllPostsQuery()
    // console.log(posts, error)
    return (
        <Col>
            {
                posts && !isPopular &&  (posts?.map((el: IPostCard, i: number) => (
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
                ))) 
            }
            {
                posts?.length === 0 && (<Title style={{ marginTop: 10 }} level={3}>Посты не найдены :(</Title>)
            }
        </Col>
    );
}

export default SearchedPostsList;