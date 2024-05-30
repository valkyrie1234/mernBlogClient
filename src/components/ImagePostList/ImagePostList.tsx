
import { Row, Col, Image} from 'antd';
import { postsApi } from '../../store/Api/PostApi';
import { useParams } from 'react-router-dom';



export const ImagePostList = () => {

    const {id} = useParams()
    const { data: currentPost, isLoading } = postsApi.useGetCurrentPostQuery(id)

    return ( 
        <Image.PreviewGroup>
        <Row gutter={[8, 10]} style={{ marginTop: 20 }}>
            {
                currentPost?.postImage?.map((el) => (
                    <Col span={4}>
                        <Image src={el} />
                    </Col>
                ))
            }
        </Row>
    </Image.PreviewGroup>
     );
}

export default ImagePostList;