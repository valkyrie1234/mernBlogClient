import React from 'react';
import { Avatar, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { IPostCard } from './../../Types/index';
import blueFon from '../../assets/blue_fon.jpg'
import { format } from 'date-fns';
import EditCardBar from '../EditCardBar/EditCardBar';
import ViewsCommentsBar from '../ViewsCommentsBar/ViewsCommentsBar';
import TagBar from '../TagBar/TagBar';

const { Meta } = Card;




const PostCard: React.FC<IPostCard> = ({ style, _id, imageUrl, createdAt, user, editable }) => {

    return (
        <Row style={style}>
            <Col span={22}>
                <Card
                    cover={<img style={{ height: '200px', objectFit: 'cover' }} src={imageUrl ? `http://localhost:4444${imageUrl}` : blueFon} />}
                    hoverable
                >
                    {editable && <EditCardBar id={_id} />}

                    <Meta
                        avatar={<Avatar size={64} src={`http://localhost:4444${user?.avatarUrl}`} />}
                        title={user.fullName}
                        description={"Пост создан:" + ' ' + format(createdAt, 'MM-dd-yyyy')}
                    />

                    <TagBar id={_id} />

                    <ViewsCommentsBar id={_id} />

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