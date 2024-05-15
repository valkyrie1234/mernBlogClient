import React from 'react';
import { Typography, Card, Row, Col, Skeleton } from 'antd';



const { Meta } = Card;
const { Title } = Typography



const PostCardSkeleton: React.FC = () => {


    return (
        <Row>
            <Col span={22} style={{marginTop: 10}}>
                <Card
                    cover={<Skeleton.Image active style={{ height: '200px', width: 580 }} />}
                    hoverable
                >
                    <Meta
                        avatar={<Skeleton.Avatar active size={64} />}
                        title={<Skeleton.Button size='small' active style={{width:200}} />}
                        description={<Skeleton.Button size='small' active style={{width:200}} />}
                    />
                    <Col span={24} style={{ padding: 10 }}>
                        <Title level={2}>
                            <Skeleton.Button style={{width:300}} size='large'/>
                        </Title>
                        <Row gutter={[2, 8]}>
                            {
                                [...Array(5)].map((_, i) => (<Col key={i}><Skeleton.Button active size='small'></Skeleton.Button></Col>))
                            }
                        </Row>

                    </Col>
                    <Row >
                        <Col span={3} style={{ padding: 10 }}>
                            <Skeleton.Button active size='small' shape='circle' />
                        </Col>
                        <Col span={3} style={{ padding: 10 }}>
                            <Skeleton.Button active size='small' shape='circle' />
                        </Col>
                    </Row>
                    <Row justify={"end"}>
                        <Col span={10}>
                            <Skeleton.Button active size='small' style={{width:240}}/>

                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row >
    );
}

export default PostCardSkeleton;