import React from 'react'
import { MemoizedMyHeader } from '../../components/Header/MyHeader';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Row, Col } from 'antd';

const LoadingPage: React.FC = () => {
    return (
        <div>
            <MemoizedMyHeader />
            <Row>
                <Col offset={12} span={12}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 128 }} spin />} />
                </Col>
            </Row>
        </div>
    );
}

export default LoadingPage;