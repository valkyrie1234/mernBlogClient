import React from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Row, Col, Card, Typography, Divider } from 'antd';
import Markdown from 'react-markdown';
import FullPostSkeleton from '../../pages/FullPostSkeleton';
import blueFon from '../../assets/blue_fon.jpg';
import { postsApi } from '../../store/Api/PostApi';
import { userApi } from '../../store/Api/UserApi';
import MessageForm from '../MessageForm/MessageForm';
import ImagePostList from '../ImagePostList/ImagePostList';
import PostCommentsList from '../PostCommentsList/PostCommentList';
import ShowCommentBtn from '../ShowCommentBtn/ShowCommentBtn';



const { Meta } = Card;
const { Title, Text } = Typography;


export const FullPostCard: React.FC = () => {

    const { data: isAuth } = userApi.useGetMeQuery()
    const { id } = useParams();
    const { data: currentPost, isLoading } = postsApi.useGetCurrentPostQuery(id)


    if (!currentPost || isLoading) {
        return <FullPostSkeleton />
    }

    console.log('render')

    return (
        <Row>
            <Col span={12} offset={6} style={{ marginTop: 10 }}>
                <Card
                    cover={<img style={{ height: '300px', objectFit: 'cover' }} src={currentPost?.imageUrl ? `http://localhost:4444${currentPost?.imageUrl}` : blueFon} />}
                    hoverable
                >
                    <Meta
                        title={<Title level={3}>{currentPost?.title}</Title>}
                        description={<Title type='secondary' level={5}>{format(currentPost?.createdAt, "MM-dd-yyyy")}</Title>}
                    />
                    <Text copyable>
                        <Markdown children={currentPost?.text} />
                    </Text>
                    <Divider />
                    <p>
                        views:{currentPost?.viewsCount}
                    </p>
                    likes: 100
                    <Title level={4}>
                        Фатоматериалы к статье.
                    </Title>

                    <ImagePostList />
                    <ShowCommentBtn postId={id} />
                    <br />
                    <br />
                    <PostCommentsList postId={id} />
                    {
                        isAuth && <MessageForm />
                    }
                </Card>
            </Col>
        </Row>
    );
}

export default FullPostCard;