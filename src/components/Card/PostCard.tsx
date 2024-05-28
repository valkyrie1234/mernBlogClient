import React from 'react';
import { Typography, Avatar, Card, Row, Col, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeFilled, CommentOutlined, DeleteOutlined, EditOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { IPostCard } from './../../Types/index';
import blueFon from '../../assets/blue_fon.jpg'
import { postsApi } from '../../store/Api/PostApi';

const { Meta } = Card;
const { Title } = Typography



const PostCard: React.FC<IPostCard> = ({ style, _id, imageUrl, createdAt, title, tags, viewsCount, user, editable, postComment }) => {

    const [deletePostTest, error] = postsApi.useDeletePostMutation()
    const removePost = () => {
        if (window.confirm('Вы действительно хотите удалить пост?')) {
            deletePostTest(_id)
        }
    }
    
    return (
        <Row style={style}>
            <Col span={22}>
                <Card
                    cover={<img style={{ height: '200px', objectFit: 'cover' }} src={imageUrl ? `http://localhost:4444${imageUrl}` : blueFon} />}
                    hoverable
                >
                    {
                        !editable ? '' : <Col style={{ display: 'flex' }} offset={16} span={2}>
                            <Link to={`/createPost/${_id}/edit`}><Button style={{ borderRadius: 0 }}><EditOutlined />edit</Button></Link>
                            <Button onClick={() => removePost()} style={{ borderRadius: 0 }} danger><DeleteOutlined />delete</Button>
                        </Col>
                    }
                    <Meta
                        avatar={<Avatar size={64} src={`http://localhost:4444${user?.avatarUrl}`} />}
                        title={user.fullName}
                        description={"Пост создан:" + ' ' + createdAt.toString().slice(0, 10)}
                    />
                    <Col span={24} style={{ padding: 10 }}>
                        <Title level={2}>
                            {title}
                        </Title>
                        <Row gutter={[2, 8]}>
                            {
                                tags?.map((el, i) => (<Col key={i}><Tag key={i} color={'red'}>#{el}</Tag></Col>))
                            }
                        </Row>

                    </Col>
                    <Row >
                        <Col span={3} style={{ padding: 10 }}>
                            <p><EyeFilled />: {viewsCount}</p>
                        </Col>
                        <Col span={3} style={{ padding: 10 }}>
                            <p><CommentOutlined />: {postComment?.length}</p>
                        </Col>
                    </Row>
                    <Row justify={"end"}>
                        <Col span={10}>
                            <Link to={`/post/${_id}`}>
                                Прочитать полность статью <ArrowRightOutlined />
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row >
    );
}

export default PostCard;