import { postsApi } from "../../store/Api/PostApi"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Button } from 'antd';
import { Link } from 'react-router-dom';

export interface IEditCardBarType {
    id: string,
}

export const EditCardBar: React.FC<IEditCardBarType> = ({ id }) => {

    const [deletePostTest] = postsApi.useDeletePostMutation()

    const removePost = () => {
        if (window.confirm('Вы действительно хотите удалить пост?')) {
            deletePostTest(id)
        }
    }

    return (
        <Col style={{ display: 'flex', gap: 4 }} offset={16} span={2}>
            <Link to={`/createPost/${id}/edit`}><Button style={{ borderRadius: 0 }}><EditOutlined />edit</Button></Link>
            <Button onClick={() => removePost()} style={{ borderRadius: 0 }} danger><DeleteOutlined />delete</Button>
        </Col>
    );
}

export default EditCardBar;