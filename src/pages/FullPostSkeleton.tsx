
import React from 'react'
import PageTransition from '../components/PageTransition/PageTransition';
import { Row, Col, Card, Image, Divider, Skeleton } from 'antd';


const { Meta } = Card;



const FullPostSkeleton: React.FC = () => {

    return (
        <PageTransition>
            <Row>
                <Col span={12} offset={6} style={{ marginTop: 10 }}>
                    <Card
                        cover={<Skeleton.Image active style={{ height: '300px', width: 951 }} />}
                        hoverable
                    >
                        <Meta
                            title={<Skeleton.Button active style={{ width: 300 }} />}
                            description={<Skeleton.Button size='small' active style={{ width: 300 }} />}
                        >
                        </Meta>
                        <Skeleton active style={{ marginTop: 20 }} />
                        <Divider />
                        <Skeleton.Button size='small' active />
                        <Skeleton.Button size='small' active />
                        <br />
                        <Skeleton.Button size='default' style={{ marginTop: 10, width: 300 }} active />
                        <Image.PreviewGroup>
                            <Row gutter={[8, 10]} style={{ marginTop: 20 }}>
                                {
                                    [...Array(7)].map((_) => (
                                        <Col span={4}>
                                            <Skeleton.Image active />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Image.PreviewGroup>
                        <Skeleton.Avatar active style={{ marginTop: 10 }} size={44} />
                    </Card>
                    <Divider />
                    {/* {
                    !showComment ?
                        ''
                        :
                        data.postComment?.map((el) => (
                            <Comments key={el._id} style={{ marginTop: 10 }} user={el.user} comment={el.comment} />
                        ))
                } */}
                </Col>
            </Row>
        </PageTransition>

    );
}

export default FullPostSkeleton;