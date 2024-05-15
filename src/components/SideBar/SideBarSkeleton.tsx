import React from 'react'
import { Col, List, Typography, Skeleton } from 'antd';

const { Title } = Typography



const SideBarSkeleton: React.FC = () => {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];



    return (
        <Col span={4} style={{marginTop:10}}>
            <List
                bordered
                dataSource={data}
                renderItem={(_) => (
                    <List.Item>
                        <Skeleton.Button size='small' active></Skeleton.Button>
                    </List.Item>
                )}
            />
            <Title level={4}>Loading...</Title>
        </Col>
    );
}

export default SideBarSkeleton;