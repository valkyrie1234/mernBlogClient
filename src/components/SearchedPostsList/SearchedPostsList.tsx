import React from 'react';
import { Col, Typography } from 'antd';
import { useAppSelector } from '../../store/Hooks/useSelector';
import PostCard from '../Card/PostCard';
import { IPostCard } from '../../Types';

const { Title } = Typography;

export interface ISearchedPostList {
    isPopular: boolean
}

const SearchedPostsList: React.FC<ISearchedPostList> = ({isPopular}) => {
    
    const data = useAppSelector(state => state.USER.data)
    const searchedPosts = useAppSelector((state) => state.POSTS.posts.searchedPosts)
    return (
        <Col>
            {
                searchedPosts && !isPopular && (searchedPosts?.map((el: IPostCard, i: number) => (
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
                )))
            }
            {
                searchedPosts.length === 0 && (<Title style={{ marginTop: 10 }} level={3}>Посты не найдены :(</Title>)
            }
        </Col>
    );
}

export default SearchedPostsList;