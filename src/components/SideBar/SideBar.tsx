import React from 'react'
import { Col, List, Tag, Typography } from 'antd';
import { SideBarProps } from '../../Types';

const { Title } = Typography



const SideBar: React.FC<SideBarProps> = ({ style, tags }) => {


    const colorTags = (): string => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


    return (
        <Col style={style} span={4}>
            <List
                style={{display:'flex', alignItems:'center', justifyContent:'space-around', padding:10}}
                bordered
                dataSource={tags}
                renderItem={(tag) => (
                    <Tag color={colorTags()}>#{tag}</Tag>
                )}
            />
            <Title level={4}>Последние 5 уникальных тегов!!!</Title>
        </Col>
    );
}

export default SideBar;