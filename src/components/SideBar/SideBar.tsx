import React from 'react'
import { Col, List, Tag, Typography } from 'antd';
import { SideBarProps } from '../../Types';
import SideBarSkeleton from './SideBarSkeleton';
import { tagsApi } from '../../store/Api/TagsApi';
import { Link } from 'react-router-dom';


const { Title } = Typography



const SideBar: React.FC<SideBarProps> = React.memo(({ style, isPostsLoading}) => {

    const { data: tags } = tagsApi.useGetAlltagsQuery()

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
                            renderItem={(tag: any) => (
                                <List.Item>
                                    <Link to={`/tags/${tag}`}>
                                        <Tag>#{tag}</Tag>
                                    </Link>
                                </List.Item>
                            )}
                        />
                        <Col offset={4}>
                            <Title level={4}>Поиск Статей по тегам</Title>
                        </Col>
                    </Col>
            }
        </>
    );
})

export default SideBar;