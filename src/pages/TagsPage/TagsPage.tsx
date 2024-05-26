import React from 'react'
import { Row, Col, Card, Tag, Divider } from 'antd'
import { useParams } from 'react-router-dom';
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import { tagsApi } from '../../store/Api/TagsApi';
import blueFon from '../../assets/blue_fon.jpg';
import { Link } from 'react-router-dom';
import { IPostCard } from '../../Types';

const { Meta } = Card;

export const TagsPage: React.FC = () => {

    const { tag } = useParams()

    const { data } = tagsApi.useGetPostsByTagsQuery(tag)

    console.log(data)

    return (
        <div>
            <MemoizedMyHeader />
            <Row style={{ margin: 0, marginTop: 10 }} gutter={[10, 10]}>
                {
                    data?.map((element: IPostCard, i: number) => (
                        <Col offset={i % 2 === 0 ? 6 : 0} span={6}>
                            <Link to={`/post/${element._id}`}>
                                <Card
                                    hoverable
                                    cover={<img height={70} style={{objectFit: 'cover'}} src={element.imageUrl ? `http://localhost:4444${element.imageUrl}` : blueFon} />}
                                >
                                    <Meta title={element.title} />
                                    <Divider />
                                    {
                                        element.tags.map((tag) => (<Tag color='red'>#{tag}</Tag>))
                                    }
                                </Card>
                            </Link>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}

export default TagsPage;