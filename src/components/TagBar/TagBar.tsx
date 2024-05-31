import { postsApi } from "../../store/Api/PostApi";
import { Typography, Row, Col, Tag } from 'antd';

const { Title } = Typography

export interface ITagBarType {
    id: string
}

export const TagBar: React.FC<ITagBarType> = ({ id }) => {

    const { data } = postsApi.useGetCurrentPostQuery(id)

    return (
        <Col span={24} style={{ padding: 10 }}>
            <Title level={2}>
                {data?.title}
            </Title>
            <Row gutter={[2, 8]}>
                {
                    data?.tags?.map((el, i) => (<Col key={i}><Tag key={i} color={'red'}>#{el}</Tag></Col>))
                }
            </Row>
        </Col>
    );
}

export default TagBar;