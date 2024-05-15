import React from 'react';
import { Col, Row, Typography, Avatar } from "antd";
import { DiscordOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons'

const { Title } = Typography

const Footer: React.FC = () => {
    return (
        <Row align={'middle'} justify={'center'} style={{ background: '#222222' }}>
            <Col span={12} offset={10} style={{marginTop:'20px'}}>
                <Title level={3} type='success'>
                    Lorem ipsum dolor Avtn
                </Title>
                <Col span={6} style={{display:'flex', gap:'5px', alignItems:'center', justifyContent:'center'}}>
                    <Avatar size={48} icon={<InstagramOutlined />} />
                    <Avatar size={48} icon={<DiscordOutlined />} />
                    <Avatar size={48} icon={<GithubOutlined />} />
                </Col>
            </Col>
        </Row>
    );
}

export default Footer;