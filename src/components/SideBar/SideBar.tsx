import React from 'react'
import { Col, List, Tag, Typography } from 'antd';
import { SideBarProps } from '../../Types';
import SideBarSkeleton from './SideBarSkeleton';

const { Title } = Typography



const SideBar: React.FC<SideBarProps> = React.memo(({ style, tags, isPostsLoading, useCallbackcolorTags }) => {


    return (
        <>
            {
                isPostsLoading ? <SideBarSkeleton />
                    :
                    <Col style={style} span={4}>
                        <List
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}
                            bordered
                            dataSource={tags}
                            renderItem={(tag) => (
                                <List.Item>
                                    <Tag color={useCallbackcolorTags()}>#{tag}</Tag>
                                </List.Item>
                            )}
                        />
                        <Title level={4}>Последние 5 уникальных тегов!!!</Title>
                    </Col>
            }
        </>
    );
})

export default SideBar;