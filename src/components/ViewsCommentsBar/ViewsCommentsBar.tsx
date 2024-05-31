import { EyeFilled, CommentOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import { postsApi } from '../../store/Api/PostApi';

export interface IViewsCommentsBarType {
    id: string
}

const ViewsCommentsBar: React.FC <IViewsCommentsBarType> = ({id}) => {

    const {data} = postsApi.useGetCurrentPostQuery(id)

    return (
        <Row >
            <Col span={3} style={{ padding: 10 }}>
                <p><EyeFilled />: {data?.viewsCount}</p>
            </Col>
            <Col span={3} style={{ padding: 10 }}>
                <p><CommentOutlined />: {data?.postComment?.length}</p>
            </Col>
        </Row>
    );
}

export default ViewsCommentsBar;