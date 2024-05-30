import React from 'react'
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Typography, Image, Divider, Badge, Avatar } from 'antd';
import Markdown from 'react-markdown';
import { MessageOutlined } from '@ant-design/icons'
import Comments from '../components/Comments/Comments';
import FullPostSkeleton from './FullPostSkeleton';
import blueFon from '../assets/blue_fon.jpg';
import { MemoizedMyHeader } from '../components/Header/MyHeader';
import { postsApi } from '../store/Api/PostApi';
import { userApi } from '../store/Api/UserApi';
import MessageForm from '../components/MessageForm/MessageForm';



const { Meta } = Card;
const { Title, Text } = Typography;



const FullPost: React.FC = () => {

    const { data: isAuth } = userApi.useGetMeQuery()
    const [showComment, setShowComment] = React.useState<boolean>(false)

    const { id } = useParams();
    const { data: currentPost, isLoading } = postsApi.useGetCurrentPostQuery(id)


    if (!currentPost || isLoading) {
        return <FullPostSkeleton />
    }

    const showCommentHandler = (): void => {
        setShowComment((prev) => !prev)
    }


    console.log(showComment)
    return (
        <div>
            <MemoizedMyHeader />
            <Row>
                <Col span={12} offset={6} style={{ marginTop: 10 }}>
                    <Card
                        cover={<img style={{ height: '300px', objectFit: 'cover' }} src={currentPost?.imageUrl ? `http://localhost:4444${currentPost?.imageUrl}` : blueFon} />}
                        hoverable
                    >
                        <Meta
                            title={<Title level={3}>{currentPost?.title}</Title>}
                            description={<Title type='secondary' level={5}>{currentPost?.createdAt?.toString().slice(0, 10)}</Title>}
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
                        <Image.PreviewGroup>
                            <Row gutter={[8, 10]} style={{ marginTop: 20 }}>
                                {
                                    currentPost?.postImage?.map((el) => (
                                        <Col span={4}>
                                            <Image src={el} />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Image.PreviewGroup>

                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Badge style={{ marginTop: 17, marginRight: 3 }} count={!currentPost?.postComment?.length ? 0 : currentPost?.postComment?.length}>
                                <Avatar style={{ marginTop: 10 }} onClick={showCommentHandler} alt='Всего комментариев' size={44} icon={<MessageOutlined />} />
                            </Badge>
                        </Col>

                        <br />
                        <br />
                        {
                            !showComment &&  currentPost?.postComment ? 
                            currentPost?.postComment?.map((el) => (
                                <Comments key={el._id} style={{ marginTop: 10, borderRadius: 0, border: '0px', borderTop: '1px solid gray' }} user={el.user} comment={el.comment} />
                            )).slice(0, 1)
                            : ''
                        }
                        {
                            !showComment ?
                                ''
                                :
                                currentPost?.postComment?.map((el) => (
                                    <Comments key={el._id} style={{ marginTop: 10, borderRadius: 0, border: '0px', borderTop: '1px solid gray' }} user={el.user} comment={el.comment} />
                                ))
                        }
                        {
                            isAuth && <MessageForm  /> 
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default FullPost;