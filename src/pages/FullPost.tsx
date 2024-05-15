import React from 'react'
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Typography, Image, Divider, Badge, Avatar, Button } from 'antd';
import Markdown from 'react-markdown';
import { MessageOutlined } from '@ant-design/icons'
import Comments from '../components/Comments/Comments';
import { IFullPost } from '../Types/index';
import FullPostSkeleton from './FullPostSkeleton';
import blueFon from '../assets/blue_fon.jpg'
import { useAppSelector } from '../store/Hooks/useSelector';
import { selectIsAuth } from '../store/slices/auth';
import ModalMessage from '../components/ModalMessage/ModalMessage';
import { useAppDispatch } from '../store/Hooks/useDispatch';
import { fetchCurrentPost } from '../store/slices/posts';
import { unwrapResult } from '@reduxjs/toolkit';
import { MemoizedMyHeader } from '../components/Header/MyHeader';



const { Meta } = Card;
const { Title, Text } = Typography;



const FullPost: React.FC = () => {


    const [showModal, setShowModal] = React.useState<boolean>(false)
    const isAuth = useAppSelector(selectIsAuth)

    const dispatch = useAppDispatch()

    const [postData, setPostData] = React.useState<IFullPost>()
    const isLoading = useAppSelector((state) => state.postsReduser.posts.isCurrentPostLoading)

    const [showComment, setShowComment] = React.useState<boolean>(false)

    const { id } = useParams();


    const changeVisibleMiodal = () => {
        setShowModal(prev => !prev)
    }

    console.log(postData);

    React.useEffect(() => {
        if (!id) {
            return;
        }

        dispatch(fetchCurrentPost(id))
            .then(unwrapResult)
            .then((res) => {
                setPostData(res)
            });

    }, [])

    if (!postData || isLoading) {
        console.log('skelet')
        return <FullPostSkeleton />
    }


    const showCommentHandler = (): void => {
        setShowComment((prev) => !prev)
    }

    return (
        <div>
            <MemoizedMyHeader />
            <Row>
                <Col span={12} offset={6} style={{ marginTop: 10 }}>
                    <Card
                        cover={<img style={{ height: '300px', objectFit: 'cover' }} src={postData?.imageUrl ? `http://localhost:4444${postData?.imageUrl}` : blueFon} />}
                        hoverable
                    >
                        <Meta
                            title={<Title level={3}>{postData.title}</Title>}
                            description={<Title type='secondary' level={5}>{postData?.createdAt?.toString().slice(0, 10)}</Title>}
                        >
                        </Meta>
                        <Text copyable>
                            <Markdown children={postData.text} />
                        </Text>
                        <Divider />
                        <p>
                            views:{postData.viewsCount}
                        </p>
                        likes: 100
                        <Title level={4}>
                            Фатоматериалы к статье.
                        </Title>
                        <Image.PreviewGroup>
                            <Row gutter={[8, 10]} style={{ marginTop: 20 }}>
                                {
                                    postData.postImage?.map((el) => (
                                        <Col span={4}>
                                            <Image src={el} />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Image.PreviewGroup>

                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Badge style={{ marginTop: 17, marginRight: 3 }} count={!postData.postComment?.length ? 0 : postData.postComment?.length}>

                                <Avatar style={{ marginTop: 10 }} onClick={showCommentHandler} size={44} alt='Всего комментариев' icon={<MessageOutlined />} />

                            </Badge>

                            {isAuth ? (<Button type='link' onClick={() => changeVisibleMiodal()}> send comment </Button>) : ''}
                            {showModal ? <ModalMessage setDataAction={setPostData} /> : ''}
                        </Col>

                    </Card>
                    <Divider />
                    {
                        !showComment ?
                            ''
                            :
                            postData.postComment?.map((el) => (
                                <Comments key={el._id} style={{ marginTop: 10 }} user={el.user} comment={el.comment} />
                            ))
                    }
                </Col>
            </Row>
        </div>
    );
}

export default FullPost;